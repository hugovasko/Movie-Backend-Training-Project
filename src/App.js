import React, { useState, useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let content = "";

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (movies.length === 0 && !error) {
    content = "No movies found.";
  }

  if (error) {
    content = "Something went wrong!";
  }

  if (isLoading) {
    content = "Loading...";
  }

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const movieData = data.results.map((mData) => {
        return {
          id: mData.episode_id,
          title: mData.title,
          openingText: mData.opening_crawl,
          releaseDate: mData.release_date,
        };
      });
      setMovies(movieData);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};

export default App;
