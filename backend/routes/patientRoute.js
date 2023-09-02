const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../utils/auth");
const {
  createPatient,
  getAllPatients,
  getPatientDetails,
  deletePatient,
  updatePatient,
  updatePatientMedicalHistory,
  updatePatientPrescribedTests,
} = require("../controller/patientController");

const router = express.Router();

router.route("/patients").get(getAllPatients);
router
  .route("/patient/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createPatient);
router
  .route("/patient/:id")
  .get(getPatientDetails)
  .delete(deletePatient)
  .put(updatePatient);

router.route("/patient/medical/:id").put(updatePatientMedicalHistory);
router.route("/patient/prescribed/:id").put(updatePatientPrescribedTests);

module.exports = router;
