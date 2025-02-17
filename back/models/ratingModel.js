const { sql } = require("../dbConnection");


exports.addRating = async (appointment_id, rating) => {
  const res = await sql`
    INSERT INTO ratings (appointment_id, rating)
    VALUES (${appointment_id}, ${rating})
    ON CONFLICT (appointment_id) DO UPDATE 
    SET rating = EXCLUDED.rating
    RETURNING *;
  `;
  return res.length > 0 ? res[0] : null;
};


exports.getRatingByAppointmentId = async (appointment_id) => {
  const res = await sql`
    SELECT ratings.rating 
    FROM ratings 
    JOIN appointments ON ratings.appointment_id = appointments.id 
    WHERE ratings.appointment_id = ${appointment_id};
  `;
  return res.length > 0 ? res[0] : { rating: null };
};
