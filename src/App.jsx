import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { searchMovies } from "./services/movieApi";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Bookmarks from "./components/Bookmarks";

function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full"
    />
  );
}

function MainApp({ bookmarks, toggleBookmark }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchQuery) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setError("Please enter a valid search term.");
      setMovies([]);
      setTotalResults(0);
      return;
    }

    setQuery(trimmedQuery);
    setPage(1);
    fetchMovies(trimmedQuery, 1);
  };

  const fetchMovies = async (searchQuery, pageNumber) => {
    setIsLoading(true);
    setError("");
    const data = await searchMovies(searchQuery, pageNumber);
    setIsLoading(false);

    if (data.Response === "True") {
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
    } else {
      setMovies([]);
      setTotalResults(0);
      setError(data.Error || "No results found.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex flex-col items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-6 mx-auto flex flex-col items-center bg-gray-800 shadow-2xl rounded-lg"
      >
        <motion.h1
          className="gradient-text text-4xl font-bold text-center w-full mb-6"
          style={{ fontFamily: "'Delicious Handrawn', cursive" }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          🎬 Movie Search App
        </motion.h1>
        <Link to="/bookmarks" className="text-yellow-400 hover:text-yellow-500 mb-4">
          View Bookmarks
        </Link>
        <SearchBar onSearch={handleSearch} />

        {isLoading ? (
          <div className="flex justify-center mt-6">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <MovieList movies={movies} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
          </>
        )}

        {totalResults > 10 && (
          <div className="flex justify-center mt-6 space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage(page - 1)}
              disabled={page === 1 || isLoading}
              className="px-5 py-3 bg-yellow-500 text-gray-900 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 disabled:opacity-50"
            >
              ⬅ Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(totalResults / 10) || isLoading}
              className="px-5 py-3 bg-yellow-500 text-gray-900 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 disabled:opacity-50"
            >
              Next ➡
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from local storage on initial render
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(savedBookmarks);
  }, []);

  // Save bookmarks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (movie) => {
    const isBookmarked = bookmarks.some((bm) => bm.imdbID === movie.imdbID);
    if (isBookmarked) {
      // Remove bookmark
      setBookmarks(bookmarks.filter((bm) => bm.imdbID !== movie.imdbID));
    } else {
      // Add bookmark
      setBookmarks([...bookmarks, { ...movie, watched: false }]);
    }
  };

  const toggleWatched = (imdbID) => {
    const updatedBookmarks = bookmarks.map((movie) =>
      movie.imdbID === imdbID ? { ...movie, watched: !movie.watched } : movie
    );
    setBookmarks(updatedBookmarks);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainApp bookmarks={bookmarks} toggleBookmark={toggleBookmark} />}
        />
        <Route
          path="/bookmarks"
          element={<Bookmarks bookmarks={bookmarks} toggleBookmark={toggleBookmark} toggleWatched={toggleWatched} />}
        />
      </Routes>
    </Router>
  );
}

export default App;