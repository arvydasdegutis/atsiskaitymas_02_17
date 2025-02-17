import { Routes, Route } from "react-router";
import { AppointmentProvider } from "./context/AppointmentContext";
import AppointmentList from "./components/AppointmentList";
import AddAppointment from "./components/AddAppointment";

import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import UserLine from "./components/UserBar";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <AppointmentProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route
            path="/appointments"
            element={
              <div>
                {" "}
                <UserLine />
                <AddAppointment /> <AppointmentList />{" "}
              </div>
            }
          />

        </Routes>
      </AppointmentProvider>
    </div>
  );
};

export default App;
