// var cloudinary = require("cloudinary").v2;
const Patients = require("../models/patientModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
//Create Patient

exports.createPatient = catchAsyncErrors(async (req, res) => {
  // const myCloud = await cloudinary.uploader.upload(req.body.patientImage, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const {
    patientName,
    patientGender,
    patientEmail,
    patientPhoneNo,
    patientAge,
    patientCity,
    patientZIP,
    guardianCity,
    guardianZIP,
    patientDOB,
    patientBloodGroup,
    patientOccupation,
    patientAdmissionStatus,
    patientAppointment,
    patientInRoom,
    patientAddress,
    guardianName,
    guardianPhone,
  } = req.body;

  const patient = await Patients.create({
    patientName,
    patientGender,
    patientEmail,
    patientPhoneNo,
    patientAge,
    patientCity,
    patientZIP,
    guardianCity,
    guardianZIP,
    patientDOB,
    patientBloodGroup,
    patientOccupation,
    patientAdmissionStatus,
    patientAppointment,
    patientInRoom,
    patientAddress,
    guardianName,
    guardianPhone,
    // patientImage: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
  });

  res.status(201).json({
    success: true,
    patient,
  });
});

//Get All Patients

exports.getAllPatients = catchAsyncErrors(async (req, res) => {
  const apiFeatures = new ApiFeatures(Patients.find(), req.query).search();

  const patients = await apiFeatures.query;

  res.status(200).json({ success: true, patients });
});

// Get Patient Details

exports.getPatientDetails = catchAsyncErrors(async (req, res, next) => {
  const patient = await Patients.findById(req.params.id);

  if (!patient) {
    return next(new ErrorHandler("Patient Not Found ", 404));
  }

  res.status(200).json({ success: true, patient });
});

//Update patient

exports.updatePatient = catchAsyncErrors(async (req, res, next) => {
  let patient = await Patients.findById(req.params.id);

  if (!patient) {
    return res.status(500).json({
      success: false,
      message: "Patient not found",
    });
  }

  patient = await Patients.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    patient,
  });
});

exports.updatePatientMedicalHistory = catchAsyncErrors(
  async (req, res, next) => {
    console.log("medicalHistory", req.body);

    const patient = await Patients.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { medicalHistory: req.body } },
      { new: true }
    );

    console.log("patient Error", patient);
    // console.log(pat)

    res.status(200).json({
      success: true,
      patient,
    });
  }
);

exports.updatePatientPrescribedTests = catchAsyncErrors(
  async (req, res, next) => {
    console.log("prescribedTests", req.body);

    const patient = await Patients.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { prescribedTests: req.body } },
      { new: true }
    );

    console.log("patient Error", patient);

    res.status(200).json({
      success: true,
      patient,
    });
  }
);

//Delete Patient

exports.deletePatient = catchAsyncErrors(async (req, res, next) => {
  const patient = await Patients.findById(req.params.id);

  if (!patient) {
    return next(new ErrorHandler("Patient Not Found ", 500));
  }

  await patient.remove();

  res.status(200).json({
    success: true,
    message: "Patient Deleted Successfully",
  });
});
