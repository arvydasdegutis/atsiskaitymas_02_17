import { useState } from "react";
import LoginForm from "../components/LoginForm";
import Signup from "../components/SignUp";

const HomePage = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">

        <div
          className="w-1/2 p-8 bg-gray-200 flex flex-col justify-center"
          style={{ fontFamily: "Andika, sans-serif" }}
        >
          <h1 className="text-3xl font-bold text-gray-800">Pets Medicare</h1>
          <p className="mt-4 text-gray-600">
            Your trusted company in managing pet health appointments. Book
            visits, track history, and ensure your pet’s well-being with ease.
          </p>
        </div>


        <div className="w-1/2 p-8 flex flex-col justify-center">
        <div className="mt-2 text-center">
            {isSignup ? (
              <p className="text-gray-600 mt-2">
                Already have an account?{" "}
                <button
                  className="text-[#512da8] font-bold"
                  onClick={() => setIsSignup(false)}
                >
                  Log in here
                </button>
              </p>
            ) : (
              <p className="text-gray-600 mt-2">
                Don't have an account?{" "}
                <button
                  className="text-[#512da8] font-bold"
                  onClick={() => setIsSignup(true)}
                >
                  Sign up now
                </button>
              </p>
            )}
          </div>
          {isSignup ? <Signup /> : <LoginForm />}

 
        </div>
      </div>
    </div>
  );
};

export default HomePage;
