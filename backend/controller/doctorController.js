const User = require("../models/userModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getAllDoctors = catchAsyncErrors(async (req, res) => {
  const allDoctors = await User.find({
    userRole: "doctor",
    userId: req.query.id,
  });

  console.log("allDoctors", allDoctors);

  if (!allDoctors) {
    return next(new ErrorHandler("Doctors Not Found ", 404));
  }

  res.status(200).json({ success: true, allDoctors });
});

exports.getSingleDoctor = catchAsyncErrors(async (req, res, next) => {
  const doctor = await User.findById(req.params.id);

  if (!doctor) {
    return next(new ErrorHandler("Doctor Not Found ", 404));
  }

  if (doctor.userRole !== "doctor") {
    return next(new ErrorHandler("user is not a doctor ", 404));
  }

  res.status(200).json({ success: true, doctor });
});

exports.updateDoctor = catchAsyncErrors(async (req, res, next) => {
  let doctor = await User.findById(req.params.id);

  if (!doctor) {
    return next(new ErrorHandler("Doctor Not Found ", 404));
  }

  if (doctor.userRole !== "doctor") {
    return next(new ErrorHandler("user is not a doctor ", 404));
  }

  doctor = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, doctor });
});

exports.deleteDoctor = catchAsyncErrors(async (req, res, next) => {
  const doctor = await User.findById(req.params.id);

  if (!doctor) {
    return next(new ErrorHandler("Doctor Not Found ", 500));
  }
  if (doctor.userRole !== "doctor") {
    return next(new ErrorHandler("user is not a doctor ", 404));
  }

  await doctor.remove();

  res.status(200).json({
    success: true,
    message: "Doctor Deleted Successfully",
  });
});
