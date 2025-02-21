import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchTerm.trim(); // Trim whitespace
    onSearch(trimmedQuery); // Pass the trimmed query to the parent component
  };

  const handleClear = () => {
    setSearchTerm(""); // Clear the input field
    onSearch(""); // Pass an empty query to the parent component
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center bg-gray-700 p-3 rounded-lg shadow-md"
    >
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-transparent border-none text-white focus:outline-none placeholder-gray-400"
        />
        {/* Search Icon */}
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/s"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-2.5 h-5 w-5 text-white-400 hover:text-red-500 transition duration-300 flex items-center justify-center z-10"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="ml-3 px-5 py-2 bg-yellow-500 text-gray-900 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
      >
        🔍 Search
      </button>
    </form>
  );
};

export default SearchBar;