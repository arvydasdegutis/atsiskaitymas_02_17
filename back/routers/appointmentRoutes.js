const express = require("express");
const router = express.Router();
const {
  getAppointment,
  getAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} = require("../controllers/appointmentController");
const {
  rateAppointment,
  getRating,
} = require("../controllers/ratingController");
const { protect } = require("../controllers/authController");

router
  .route("/")
  .get(protect, getAppointments)
  .post(protect, createAppointment);

router
  .route("/:id")
  .get(protect, getAppointment)
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);


router
  .route("/:id/rating")
  .get(protect, getRating)
  .put(protect, rateAppointment);

module.exports = router;
