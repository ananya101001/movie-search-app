import React from "react";

function MovieCard({ movie, isBookmarked, toggleBookmark, watched }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="mt-3 text-xl font-semibold text-yellow-400">{movie.Title}</h2>
      <p className="text-gray-300">Year: {movie.Year}</p>
      <button
        onClick={() => toggleBookmark(movie)}
        className={`mt-4 w-full px-4 py-2 rounded-lg ${
          isBookmarked ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-600"
        } text-gray-900 font-bold transition duration-300`}
      >
        {isBookmarked ? "Remove Bookmark" : "Bookmark"}
      </button>
      {watched && (
        <p className="mt-2 text-green-500">Watched</p>
      )}
    </div>
  );
}

export default MovieCard;