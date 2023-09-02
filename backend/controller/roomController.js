const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Rooms = require("../models/roomModel");

//Create Room
exports.createRoom = catchAsyncErrors(async (req, res) => {
  const room = await Rooms.create(req.body);

  res.status(201).json({
    success: true,
    room,
  });
});

//Get All Rooms

exports.getAllRooms = catchAsyncErrors(async (req, res) => {
  const rooms = await Rooms.find();

  res.status(200).json({
    success: true,
    rooms,
  });
});

//Get Room Details

exports.getRoomDetails = async (req, res, next) => {
  const room = await Rooms.findById(req.params.id);

  if (!room) {
    return next(new ErrorHandler("Room Not Found ", 404));
  }

  res.status(200).json({ success: true, room });
};

// Update Room
exports.updateRoom = catchAsyncErrors(async (req, res) => {
  let room = await Rooms.findById(req.params.id);

  if (!room) {
    return res.status(500).json({
      success: false,
      message: "Room not found",
    });
  }

  const prevPatientRoom = await room.saveCurrentPatient(room);

  room = await Rooms.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const updatedBody = {
    admissionDate: room.admissionDate,
    patientId: room.patientId,
    patientName: room.patientName,
    roomNo: room.roomNo,
    vacancyStatus: room.vacancyStatus,
    history: prevPatientRoom,
  };

  res.status(200).json({
    success: true,
    updatedBody,
  });
});

// Delete Room

exports.deleteRoom = async (req, res, next) => {
  const room = await Rooms.findById(req.params.id);

  if (!room) {
    return res.status(500).json({
      success: false,
      message: "Room not found",
    });
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: "Room Deleted Successfully",
  });
};
