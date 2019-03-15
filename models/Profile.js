const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  organizationName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  defaultTax: {
    type: Number,
    trim: true
  },
  location: {
    address: {
      type: String,
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    }
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
