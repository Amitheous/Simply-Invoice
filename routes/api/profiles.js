const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Model
const Profile = require("../../models/Profile");

const validateProfileInput = require("../../validation/profile");

// @route   GET api/profiles
// @desc    Get your profile info
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res
            .status(404)
            .json({ noProfile: "There is no profile for this user" });
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST /api/profiles
// @desc    Create or update profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.organizationName)
      profileFields.organizationName = req.body.organizationName;
    if (req.body.email) profileFields.email = req.body.email;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.defaultTax) profileFields.defaultTax = req.body.defaultTax;
    if (req.body.location) profileFields.location = req.body.location;

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        ).then(profile => res.json(profile));
      } else {
        // Create new
        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

module.exports = router;
