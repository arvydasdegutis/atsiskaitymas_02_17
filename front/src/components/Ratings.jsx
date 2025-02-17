import { useState, useEffect } from "react";
import axios from "axios";

const Ratings = ({ appointmentId, currentUser }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    fetchRating();
  }, []);

  const fetchRating = async () => {
    try {
      const res = await axios.get(
        `/api/v1/appointments/${appointmentId}/rating`,
        { withCredentials: true }
      );
      if (res.data.data.rating !== null) {
        setRating(res.data.data.rating);
      } else {
        setRating(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRate = async (newRating) => {
    if (currentUser.role === "admin") return;

    try {
      await axios.put(
        `/api/v1/appointments/${appointmentId}/rating`,
        { rating: newRating },
        { withCredentials: true }
      );
      setRating(newRating);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex space-x-2 mt-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() => handleRate(num)}
          onMouseEnter={() => setHover(num)}
          onMouseLeave={() => setHover(null)}
          className={`px-3 py-1 rounded transition ${
            num <= (hover || rating)
              ? "bg-yellow-500 text-white"
              : "bg-gray-300"
          } ${
            currentUser.role === "admin"
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={currentUser.role === "admin"}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Ratings;
