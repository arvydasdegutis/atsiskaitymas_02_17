import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAppointments } from "../context/AppointmentContext";

const API_URL = import.meta.env.VITE_API_URL;
export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const appointmentsContext = useAppointments();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });

        setUser(response.data);
      } catch (error) {
        console.log(error.response?.data);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user && appointmentsContext?.fetchAppointments) {
      appointmentsContext.fetchAppointments();
    }
  }, [user, appointmentsContext]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
