import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log("Form Data before sending:", formData); 

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data: response } = await axios.post(
        `${API_URL}/users/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordconfirm: formData.confirmPassword, 
        },
        { withCredentials: true }
      );

      console.log("Signup successful, user data:", response);
      setUser(response.data);
      navigate("/appointments");
    } catch (error) {
      console.log("Signup error:", error.response?.data);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="mt-1 w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

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

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", { required: "Please confirm your password" })}
            className="mt-1 w-full border p-2 rounded"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
