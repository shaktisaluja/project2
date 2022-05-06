const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,

      validate: {
        validator: function (email) {
          return /^[a-z0-9]{1,}@g(oogle)?mail\.com$/.test(email);
        },
        message: "please enter a valid email address",
      },
    },
    mobile: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (mobile) {
          return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[0-9]\d{9}$/.test(
            mobile
          );
        },
        message: "please enter a valid Mobile number",
      },
    },
    collegeId: {
      type: ObjectId,
      
      ref: "College",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);
