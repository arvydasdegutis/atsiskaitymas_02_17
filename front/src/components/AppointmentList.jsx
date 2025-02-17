import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import SortBy from "./SortBy";
import Ratings from "./Ratings"; 

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(UserContext);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    pet_name: "",
    aptDate: "",
    aptTime: "",
    notes: "",
  });

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`, { withCredentials: true });
      setAppointments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (appointment) => {
    const appointmentDate = new Date(appointment.appointment_date);
    setEditingId(appointment.id);
    setFormData({
      pet_name: appointment.pet_name || "",
      aptDate: appointmentDate.toISOString().split("T")[0], 
      aptTime: appointmentDate.toTimeString().split(" ")[0].slice(0, 5),
      notes: appointment.notes || "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateAppointment = async (id) => {
    try {
      await axios.put(`${API_URL}/appointments/${id}`, {
        pet_name: formData.pet_name,
        notes: formData.notes,
        appointment_date: `${formData.aptDate}T${formData.aptTime}:00`,
      }, { withCredentials: true });

      setEditingId(null);
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`, { withCredentials: true });
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (sortField, order) => {
    console.log(`Sorting by ${sortField} in ${order} order`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Appointments</h2>
      <SortBy onSortChange={handleSortChange} />
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="text-center text-gray-600">No appointments found.</div>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white shadow-md p-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{appointment.pet_name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(appointment.appointment_date).toLocaleString()} 
                </p>
              </div>
              <div className="mt-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Owner:</span> {appointment.owner_name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Notes:</span> {appointment.notes || "No notes available"}
                </p>
              </div>


              <Ratings appointmentId={appointment.id} currentUser={user} />


              {editingId === appointment.id ? (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <label className="block text-gray-600 mb-1">Pet Name</label>
                  <input
                    type="text"
                    name="pet_name"
                    className="w-full p-2 border rounded mb-2"
                    value={formData.pet_name}
                    onChange={handleChange}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1">Date</label>
                      <input
                        type="date"
                        name="aptDate"
                        className="w-full p-2 border rounded"
                        value={formData.aptDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Time</label>
                      <input
                        type="time"
                        name="aptTime"
                        className="w-full p-2 border rounded"
                        value={formData.aptTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <label className="block text-gray-600 mt-2 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    className="w-full p-2 border rounded"
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>

                  <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={() => updateAppointment(appointment.id)} className="bg-blue-500 text-white px-4 py-2 rounded">
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                       Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end mt-4 space-x-2">
                  {(user.role === "admin" || user.id === appointment.user_id) && (
                    <button onClick={() => handleEditClick(appointment)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                       Edit
                    </button>
                  )}
                  {(user.role === "admin" || user.id === appointment.user_id) && (
                    <button onClick={() => deleteAppointment(appointment.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                       Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentList;








