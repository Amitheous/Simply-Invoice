const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Model
const Form = require("../../models/Form");

// Validation
const validateFormInput = require("../../validation/form");

// @route   POST api/forms
// @desc    Create new invoice/bill
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateFormInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let dateOfPay;
    if (req.body.status === "paid") {
      dateOfPay = req.body.date;
    } else {
      dateOfPay = null;
    }
    const newForm = new Form({
      user: req.user.id,
      formType: req.body.formType.toLowerCase(),
      title: req.body.title,
      date: req.body.date,
      dueDate: req.body.dueDate,
      description: req.body.description,
      formNumber: req.body.formNumber,
      status: req.body.status,
      datePaid: dateOfPay,
      referenceNumber: req.body.referenceNumber,
      from: req.body.from,
      to: req.body.to,
      items: req.body.items,
      tax: req.body.tax,
      subtotal: req.body.subtotal,
      total: req.body.total
    });

    newForm
      .save()
      .then(form => res.json(form))
      .catch(err => res.json(err));
  }
);

// @route   GET api/forms/invoices
// @desc    Get all invoices
// @access  Private
router.get(
  "/invoices",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Form.find({ user: req.user.id, formType: "invoice" })
      .sort({ date: -1 })
      .exec(function(err, forms) {
        if (err) return handleError(err);

        res.json(forms);
      });
  }
);

// @route   GET api/forms/bills
// @desc    Get all bills
// @access  Private
router.get(
  "/bills",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Form.find({ user: req.user.id, formType: "bill" })
      .sort({ date: -1 })
      .exec(function(err, forms) {
        if (err) return handleError(err);

        res.json(forms);
      });
  }
);

// @route GET api/forms/bills/:days
// @desc Get bills within the last x amount of days
// Is it better to do this individually for bills and invoices on the back end? Or to do them all together and separate them on the front end? I would think doing it on the back end would be faster to process, but also requires 2 http requests...

router.get(
  "/bills/days/:days",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // converts date to milliseconds and finds how far back to include
    // 86400000 is the number of milliseconds in 1 day.
    generateDate = diff => {
      const output = new Date().valueOf() - diff * 86400000;
      return new Date(output).toISOString();
    };
    const dateWindow = generateDate(req.params.days);
    Form.find({ user: req.user.id, formType: "bill" })
      .where("date")
      .gte(dateWindow)
      .sort("dueDate")

      .exec(function(err, forms) {
        if (err) return handleError(err);

        res.json(forms);
      });
  }
);
// @route GET api/forms/invoices/:days
// @desc Get invoices within the last x amount of days
router.get(
  "/invoices/days/:days",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // converts date to milliseconds and finds how far back to include
    // 86400000 is the number of milliseconds in 1 day.
    generateDate = diff => {
      const output = new Date().valueOf() - diff * 86400000;
      return new Date(output).toISOString();
    };
    const dateWindow = generateDate(req.params.days);
    Form.find({ user: req.user.id, formType: "invoice" })
      .where("date")
      .gte(dateWindow)
      .sort("dueDate")
      .exec(function(err, forms) {
        if (err) return handleError(err);

        res.json(forms);
      });
  }
);

// @route   GET api/forms/invoices/:id
// @desc    Get invoice by id
router.get(
  "/invoices/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Form.findOne({ user: req.user.id, formType: "invoice", _id: req.params.id })
      .then(form => res.json(form))
      .catch(err => res.json(err));
  }
);
// @route   GET api/forms/bills/:id
// @desc    Get invoice by id
router.get(
  "/bills/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Form.findOne({ user: req.user.id, formType: "bill", _id: req.params.id })
      .then(form => res.json(form))
      .catch(err => res.json(err));
  }
);

// @route   POST api/forms/:id
// @desc    Update Invoices and Bills
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find the client within the current users clients by its id
    Form.findOne({ user: req.user.id, _id: req.params.id })
      .then(form => {
        if (String(req.user.id) !== String(form.user)) {
          return res.status(401).json({
            noAuth: "Not authorized"
          });
        } else {
          //  Only update the fields that are submitting values.
          // Remember on the front end if they delete a field it will be replaced with "" an empty string

          let updatedData = {};

          if (form.status === "unpaid" && req.body.status === "paid") {
            const dateOfPay = Date.now().toISOString();
            updatedData.datePaid = dateOfPay;
          }

          if (req.body.title) updatedData.title = req.body.title;
          if (req.body.formType) updatedData.formType = req.body.formType;
          if (req.body.description)
            updatedData.description = req.body.description;
          if (req.body.formNumber) updatedData.formNumber = req.body.formNumber;
          if (req.body.status) updatedData.status = req.body.status;
          if (req.body.referenceNumber)
            updatedData.referenceNumber = req.body.referenceNumber;
          if (req.body.date) updatedData.date = req.body.date;
          if (req.body.dueDate) updatedData.dueDate = req.body.dueDate;
          if (req.body.from) updatedData.from = req.body.from;
          if (req.body.to) updatedData.to = req.body.to;
          if (req.body.items) updatedData.items = req.body.items;
          if (req.body.tax) updatedData.tax = req.body.tax;
          if (req.body.subtotal) updatedData.subtotal = req.body.subtotal;
          if (req.body.total) updatedData.total = req.body.total;

          updatedData._id = form._id;
          updatedData.title = req.body.title ? req.body.title : form.title;
          updatedData.user = req.user.id;

          Form.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData },
            { new: true },
            (err, doc) => {
              if (err) {
                res.json(err);
              }
              res.json(doc);
            }
          );
        }
      })
      .catch(err => res.json(err));
  }
);

// @route   DELETE api/forms/invoices/:id
// @desc    Delete invoice by id
router.delete(
  "/invoices/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Form.findOne({ user: req.user.id, formType: "invoice", _id: req.params.id })
      .then(invoice => {
        // Check for correct user
        if (invoice.user.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: "User not authorized" });
        }
        // Delete
        invoice.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ notfound: "Invoice not found" }));
  }
);

// @route   DELETE api/forms/bills/:id
// @desc    Delete bill by id
router.delete(
  "/bills/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Form.findOne({ user: req.user.id, formType: "bill", _id: req.params.id })
      .then(bill => {
        // Check for correct user
        if (bill.user.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: "User not authorized" });
        }
        // Delete
        bill.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ notfound: "Bill not found" }));
  }
);

module.exports = router;
