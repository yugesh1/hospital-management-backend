const express = require("express");
const {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
  getRoomDetails,
} = require("../controller/roomController");
const router = express.Router();

router.route("/room/new").post(createRoom);
router.route("/rooms").get(getAllRooms);
router
  .route("/room/:id")
  .put(updateRoom)
  .delete(deleteRoom)
  .get(getRoomDetails);

module.exports = router;
