const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please Enter userName"],
    maxLength: [30, "Name should not exceed 30 characters"],
    minlength: [2, "Name should not have less than 5 characters"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  userRole: {
    type: String,
    default: "patient",
  },
  biography: {
    type: String,
  },
  userAvailability: {
    type: String,
    required: [true, "Please Enter Availabilty"],
    default: "Available",
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phoneNo: {
    type: Number,
    required: [true, "Please Enter your Phone No"],
  },
  address: {
    type: String,
    required: [true, "Please Enter your Address"],
  },
  userId: {
    type: String,
    // required: [true, "Please provide userId"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expire,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Users", userSchema);
