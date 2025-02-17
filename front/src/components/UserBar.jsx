import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const UserLine = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/users/logout`, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4 text-white rounded flex justify-between items-center px-4 py-2 shadow-md" 
         style={{ backgroundColor: "#512da8" }}>
      <span className="text-lg font-semibold">
        {user ? `Hello, ${user.name}` : "Hello, Guest"}
      </span>
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
        >
          Logout
        </button>
      ) : 
      <button
      onClick={handleLogin}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
    >
      Login
    </button> }
    </div>
  );
};

export default UserLine;
