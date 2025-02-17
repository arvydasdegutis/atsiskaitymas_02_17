import { useState } from "react";

const SortBy = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState("Pet Name");
  const [order, setOrder] = useState("Asc");
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (option) => {
    setSortBy(option);
    onSortChange(option, order);
    setIsOpen(false);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
    onSortChange(sortBy, newOrder);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-700 text-white font-semibold py-2 px-4 rounded flex items-center"
      >
        Sort by: <span className="ml-2">&#9662;</span>
      </button>

      {isOpen && (
        <div className="absolute  mt-2 w-44 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <button
            className={`block px-4 py-2 w-full text-left ${
              sortBy === "Pet Name" ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() => handleSortChange("Pet Name")}
          >
            Pet Name
          </button>
          <button
            className={`block px-4 py-2 w-full text-left ${
              sortBy === "Date" ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() => handleSortChange("Date")}
          >
            Date
          </button>
          <button
            className={`block px-4 py-2 w-full text-left ${
              sortBy === "Owner" ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() => handleSortChange("Owner")}
          >
            Owner
          </button>
          <div className="border-t border-gray-300 my-1"></div>
          <button
            className={`block px-4 py-2 w-full text-left ${
              order === "Asc" ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() => handleOrderChange("Asc")}
          >
            Asc
          </button>
          <button
            className={`block px-4 py-2 w-full text-left ${
              order === "Desc" ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() => handleOrderChange("Desc")}
          >
            Desc
          </button>
        </div>
      )}
    </div>
  );
};

export default SortBy;
