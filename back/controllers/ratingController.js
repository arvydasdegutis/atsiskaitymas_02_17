const {
  addRating,
  getRatingByAppointmentId,
} = require("../models/ratingModel");
const { getAppointmentById } = require("../models/appointmentModel");
const AppError = require("../utils/appError");

exports.getRating = async (req, res, next) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    if (!appointment) {
      throw new AppError({ status: "error", message: "Appointment not found" });
    }

    const rating = await getRatingByAppointmentId(req.params.id);
    res.json({ status: "success", data: rating });
  } catch (error) {
    next(error);
  }
};

exports.rateAppointment = async (req, res, next) => {
  try {
    const { rating } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      throw new AppError({
        status: "error",
        message: "Invalid rating. Must be between 1 and 5.",
      });
    }

    const appointment = await getAppointmentById(req.params.id);
    if (!appointment) {
      throw new AppError({ status: "error", message: "Appointment not found" });
    }

    if (req.user.role === "admin") {
      throw new AppError({
        status: "error",
        message: "Admins cannot rate appointments",
      });
    }

    if (appointment.user_id !== req.user.id) {
      throw new AppError({
        status: "error",
        message: "You can only rate your own appointments",
      });
    }

    const updatedRating = await addRating(req.params.id, rating);
    res.json({ status: "success", data: updatedRating });
  } catch (error) {
    next(error);
  }
};
