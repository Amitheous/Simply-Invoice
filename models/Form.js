const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  formType: {
    type: String,
    trim: true,
    required: true,
    enum: ["invoice", "bill"]
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String
  },
  formNumber: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: String,
    trim: true,
    required: true,
    emum: ["paid", "unpaid"]
  },
  referenceNumber: {
    type: String,
    trim: true
  },
  date: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  datePaid: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  from: {
    organizationName: {
      type: String,
      trim: true,
      required: true
    },
    location: {
      address: {
        type: String,
        trim: true
      },
      city: {
        type: String,
        trim: true
      },
      state: {
        type: String,
        trim: true
      },
      zipCode: {
        type: String,
        trim: true
      }
    }
  },
  to: {
    organizationName: {
      type: String,
      trim: true,
      required: true
    },
    location: {
      address: {
        type: String,
        trim: true
      },
      city: {
        type: String,
        trim: true
      },
      state: {
        type: String,
        trim: true
      },
      zipCode: {
        type: String,
        trim: true
      }
    }
  },
  items: [
    {
      description: {
        type: String,
        trim: true,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      rate: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      date: {
        type: Date
      },
      tags: [
        {
          type: String,
          trim: true
        }
      ]
    }
  ],
  tax: {
    type: Number
  },
  subtotal: {
    type: Number
  },
  total: {
    type: Number
  }
});

module.exports = Form = mongoose.model("forms", FormSchema);
