import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AppointmentContext = createContext();

export const useAppointments = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("🔍 Fetching appointments...");
        const response = await axios.get(`${API_URL}/appointments`, {
          withCredentials: true,
        });

        setAppointments(response.data.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchAppointments();
  }, []);

  const addAppointment = async (appointment) => {
    try {
      const res = await axios.post(`${API_URL}/appointments`, appointment, {
        withCredentials: true,
      });

      setAppointments((prev) => [...prev, res.data.data]);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
