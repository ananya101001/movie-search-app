import React from "react";
import MovieCard from "./MovieCard";

function Bookmarks({ bookmarks, toggleBookmark, toggleWatched }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-4xl p-6 mx-auto flex flex-col items-center bg-gray-800 shadow-2xl rounded-lg">
        <h1 className="text-4xl font-bold text-center w-full mb-6 text-yellow-400" style={{ fontFamily: "'Delicious Handrawn', cursive" }}>
          🎬 Bookmarked Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {bookmarks.map((movie) => (
            <div key={movie.imdbID} className="relative">
              <MovieCard
                movie={movie}
                isBookmarked={true}
                toggleBookmark={() => toggleBookmark(movie)}
              />
              <button
                onClick={() => toggleWatched(movie.imdbID)}
                className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm ${
                  movie.watched ? "bg-green-500" : "bg-gray-500"
                } text-white`}
              >
                {movie.watched ? "Watched" : "Mark as Watched"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;