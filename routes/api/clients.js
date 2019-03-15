const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Model
const Client = require("../../models/Client");

// Validation
const validateClientInput = require("../../validation/client");

// @route   POST /api/clients
// @desc    Add a client
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClientInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newClient = new Client({
      user: req.user.id,
      organizationName: req.body.organizationName,
      name: req.body.name,
      email: req.body.email,
      website: req.body.website,
      phone: req.body.phone,
      notes: req.body.notes,
      location: req.body.location
    });

    newClient.save().then(client => res.json(client));
  }
);

// @route   GET api/clients
// @desc    Get all clients of current user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Client.find({ user: req.user.id })
      .sort({ name: 1 })
      .exec(function(err, clients) {
        if (err) return handleError(err);
        res.json(clients);
      });
  }
);

// @route   GET api/clients/:id
// @desc    Get client by ID
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Client.findOne({ user: req.user.id, _id: req.params.id })
      .then(client => res.json(client))
      .catch(err =>
        res.status(404).json({ notFound: "No client found with that ID" })
      );
  }
);

// @route   POST api/clients/:id
// @desc    Update Client
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find the client within the current users clients by its id
    Client.findOne({ user: req.user.id, _id: req.params.id }).then(client => {
      //  Only update the fields that are submitting values.
      // Remember on the front end if they delete a field it will be replaced with "" an empty string
      client.organizationName = req.body.organizationName
        ? req.body.organizationName
        : client.organizationName;
      client.name = req.body.name ? req.body.name : client.name;
      client.email = req.body.email ? req.body.email : client.email;
      client.website = req.body.website ? req.body.website : client.website;
      client.phone = req.body.phone ? req.body.phone : client.phone;
      client.notes = req.body.notes ? req.body.notes : client.notes;
      client.location.address = req.body.address
        ? req.body.address
        : client.location.address;
      client.location.zipCode = req.body.zipCode
        ? req.body.zipCode
        : client.location.zipCode;
      client.location.state = req.body.state
        ? req.body.state
        : client.location.state;
      client.location.city = req.body.city
        ? req.body.city
        : client.location.city;

      // Save the updated client or check for an error
      client
        .save()
        .then(client => res.json(client))
        .catch(err => res.json(err));
    });
  }
);

// @route   DELETE api/clients/:id
// @desc    Delete client by ID
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Client.findOne({ user: req.user.id, _id: req.params.id })
      .then(client => {
        // Check for correct user
        if (client.user.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: "User not authorized" });
        }
        // Delete
        client.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ notfound: "Client not found" }));
  }
);

module.exports = router;
