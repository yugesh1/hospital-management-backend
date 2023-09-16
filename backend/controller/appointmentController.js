const Appointments = require("../models/appointmentModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createAppointment = catchAsyncErrors(async (req, res) => {
  const appointment = await Appointments.create({
    ...req.body,
    userId: req.query.id,
  });

  res.status(201).json({
    success: true,
    appointment,
  });
});

//Get All Appointments

exports.getAllAppointments = catchAsyncErrors(async (req, res) => {
  const appointments = await Appointments.find({ userId: req.query.id });

  if (!appointments) {
    return next(new ErrorHandler("Appointments Not Found ", 404));
  }

  res.status(200).json({ success: true, appointments });
});

//Get a Single Appointment

exports.getAppointmentDetails = async (req, res, next) => {
  const appointment = await Appointments.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found ", 404));
  }

  res.status(200).json({ success: true, appointment });
};

//Update an Appointment

exports.updateAppointment = catchAsyncErrors(async (req, res) => {
  let appointment = await Appointments.findById(req.params.id);

  if (!appointment) {
    return res.status(500).json({
      success: false,
      message: "Appointment not found",
    });
  }

  appointment = await Appointments.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    appointment,
  });
});

//Delete an Appointment

exports.deleteAppointment = async (req, res, next) => {
  const appointment = await Appointments.findById(req.params.id);

  if (!appointment) {
    return res.status(500).json({
      success: false,
      message: "Appointment not found",
    });
  }

  await appointment.remove();

  res.status(200).json({
    success: true,
    message: "Appointment Deleted Successfully",
  });
};
