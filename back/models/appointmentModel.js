const { sql } = require("../dbConnection");


exports.getAppointmentsByUserId = async (user_id) => {
  const res = await sql`
    SELECT appointments.*, users.name AS owner_name
    FROM appointments
    JOIN users ON appointments.user_id = users.id
    WHERE appointments.user_id = ${user_id}
    ORDER BY appointment_date;
  `;
  return res;
};


exports.getAllAppointments = async () => {
  const res = await sql`
    SELECT appointments.*, users.name AS owner_name
    FROM appointments
    JOIN users ON appointments.user_id = users.id
    ORDER BY appointment_date;
  `;
  return res;
};


exports.getAppointmentById = async (id) => {
  const res = await sql`SELECT * FROM appointments WHERE id = ${id}`;
  return res.length > 0 ? res[0] : null;
};


exports.createAppointment = async (appointment) => {
  const insertedApp = await sql`
    INSERT INTO appointments ${sql(appointment, ["user_id", "pet_name", "appointment_date", "notes"])}
    RETURNING *;
  `;
  return insertedApp[0];
};

exports.updateAppointment = async (id, appointment) => {
  const { pet_name, notes, appointment_date } = appointment;

  const res = await sql`
    UPDATE appointments 
    SET pet_name = ${pet_name}, 
        notes = ${notes}, 
        appointment_date = ${appointment_date}
    WHERE id = ${id}
    RETURNING *;
  `;

  return res.length > 0 ? res[0] : null;
};


exports.deleteAppointment = async (id) => {
  const res = await sql`
    DELETE FROM appointments WHERE id = ${id} RETURNING id;
  `;
  return res.length > 0;
};
