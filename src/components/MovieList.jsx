import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, bookmarks, toggleBookmark }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isBookmarked={bookmarks.some((bm) => bm.imdbID === movie.imdbID)}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};

export default MovieList;