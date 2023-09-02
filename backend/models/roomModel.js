const mongoose = require("mongoose");

const previousPatientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    _id: false,
    ref: "Patient",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  admittedOn: {
    type: String,
  },
  dischargedOn: {
    type: String,
  },
});

const roomSchema = mongoose.Schema({
  admissionDate: {
    type: Date,
    default: Date.now,
  },
  history: [previousPatientSchema],
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
    required: true,
    _id: false,
  },
  patientName: {
    type: String,
    required: [true, "Please Enter Patient Name"],
  },
  roomNo: {
    type: Number,
    required: [true, "Please Enter Room Number"],
  },
  vacancyStatus: {
    type: Boolean,
    required: [true, "Please Enter Status "],
  },
});

roomSchema.methods.saveCurrentPatient = async function (room) {
  const prevPatient = {
    user: room.patientId,
    name: room.patientName,
    admittedOn: room.admissionDate,
    dischargedOn: new Date().toISOString().slice(0, 10),
  };

  return prevPatient;
};

module.exports = mongoose.model("Rooms", roomSchema);
