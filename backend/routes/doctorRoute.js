const express = require("express");

const {
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controller/doctorController");

const router = express.Router();

router.route("/doctors/all").get(getAllDoctors);
router
  .route("/doctor/:id")
  .get(getSingleDoctor)
  .put(updateDoctor)
  .delete(deleteDoctor);

module.exports = router;
