const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    fullName: {
    type: String,
      trim: true,
      required: true,
    },
    logoLink: {
      type: String,
      trim: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", CollegeSchema);
