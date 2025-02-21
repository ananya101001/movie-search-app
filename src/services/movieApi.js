import axios from "axios";

const API_KEY = "ab25a7de"; // Replace with your OMDb API key
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Response: "False", Error: "An error occurred" };
  }
};