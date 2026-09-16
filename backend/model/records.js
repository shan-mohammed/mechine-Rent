const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    rent: {
      type: Number,
      min: 0,
    },

    expense: {
      type: Number,
      default: 0,
      min: 0,
    },

    expenseDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Record", recordSchema);