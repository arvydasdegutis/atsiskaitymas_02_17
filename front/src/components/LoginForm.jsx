import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

function LoginForm() {
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    console.log("Sending login request:", formData); 

    try {
      const { data: response } = await axios.post(
        `${API_URL}/users/login`,
        formData,
        { withCredentials: true }
      );

      console.log("Login successful:", response); 
      setUser(response.data);
      navigate("/appointments"); 
    } catch (error) {
      console.log("Login error:", error.response?.data || error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error response details:", error.response.data);
          const errorMessage =
            error.response.data.message || error.response.data.errors?.[0]?.msg || "Login failed";
          setError(errorMessage); 
        } else if (error.request) {
          setError("No response from server. Check internet connection");
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {typeof error === "string" ? error : "An error occurred"}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: 8 })}
            className="mt-1 w-full border p-2 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
