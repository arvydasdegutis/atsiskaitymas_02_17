const {
  getAppointmentsByUserId,
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../models/appointmentModel");
const AppError = require("../utils/appError");

exports.getAppointments = async (req, res, next) => {
  try {
    const appointments =
      req.user.role === "admin"
        ? await getAllAppointments()
        : await getAppointmentsByUserId(req.user.id);

    res.status(200).json({ status: "success", data: appointments });
  } catch (error) {
    next(error);
  }
};

exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    if (!appointment)
      throw new AppError({ status: "error", message: "Appointment not found" });

    if (req.user.role !== "admin" && appointment.user_id !== req.user.id) {
      throw new AppError({ status: "error", message: "Permission denied" });
    }

    res.json({
      status: "success",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.createAppointment = async (req, res, next) => {
  try {
    const { pet_name, appointment_date, notes } = req.body;
    if (!pet_name || !appointment_date || !notes) {
      throw new AppError({
        status: "error",
        message: "Missing required fields",
      });
    }

    const newAppointment = await createAppointment({
      user_id: req.user.id,
      pet_name,
      appointment_date,
      notes,
    });
    res.status(201).json({
      status: "success",
      data: newAppointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    if (!appointment)
      throw new AppError({ status: "error", message: "Appointment not found" });

    if (req.user.role !== "admin" && appointment.user_id !== req.user.id) {
      throw new AppError({ status: "error", message: "Permission denied" });
    }

    const updatedAppointment = await updateAppointment(req.params.id, req.body);
    res.json({
      status: "success",
      data: updatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    if (!appointment)
      throw new AppError({ status: "error", message: "Appointment not found" });

    if (req.user.role !== "admin" && appointment.user_id !== req.user.id) {
      throw new AppError({ status: "error", message: "Permission denied" });
    }

    const deleted = await deleteAppointment(req.params.id);
    res.json({
      status: "success",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
