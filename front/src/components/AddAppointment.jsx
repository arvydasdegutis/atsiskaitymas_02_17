import { useState, useContext } from "react";
import { useAppointments } from "../context/AppointmentContext";
import { UserContext } from "../context/UserContext";

const AddAppointment = () => {
  const { addAppointment } = useAppointments();
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    petName: "",
    aptDate: "",
    aptTime: "",
    aptNotes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert("User not found! Please log in.");
      return;
    }

    const newAppointment = {
      user_id: user.id,
      pet_name: formData.petName,
      appointment_date: `${formData.aptDate}T${formData.aptTime}:00`,
      notes: formData.aptNotes,
    };

    await addAppointment(newAppointment);
    setFormData({ petName: "", aptDate: "", aptTime: "", aptNotes: "" });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
        Add Appointment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Pet Name</label>
          <input
            type="text"
            name="petName"
            className="w-full p-2 border rounded"
            required
            value={formData.petName}
            onChange={handleChange}
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-600">Date</label>
            <input
              type="date"
              name="aptDate"
              className="w-full p-2 border rounded"
              required
              value={formData.aptDate}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-600">Time</label>
            <input
              type="time"
              name="aptTime"
              className="w-full p-2 border rounded"
              required
              value={formData.aptTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-600">Appointment Notes</label>
          <textarea
            name="aptNotes"
            className="w-full p-2 border rounded"
            rows="4"
            required
            value={formData.aptNotes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full text-white p-2 rounded"
          style={{ backgroundColor: "#512da8" }}
        >
          Add Appointment
        </button>
      </form>
    </div>
  );
};

export default AddAppointment;
