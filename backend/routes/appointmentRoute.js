const express = require("express");
const {
  createAppointment,
  getAllAppointments,
  getAppointmentDetails,
  updateAppointment,
  deleteAppointment,
} = require("../controller/appointmentController");

const router = express.Router();

router.route("/appointment/new").post(createAppointment);
router.route("/appointments").get(getAllAppointments);
router
  .route("/appointment/:id")
  .get(getAppointmentDetails)
  .put(updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
