import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import MovieGenre from './MovieGenre';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import the CSS for Skeleton

const apiKey = 'f5828956e687734f9de964911f117a38';

const fetchMovies = async (year, selectedGenres) => {
  const genreQuery = selectedGenres.length ? `&with_genres=${selectedGenres.join(',')}` : '';
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100${genreQuery}`
  );
  return response.data.results.slice(0, 20); // Limit to top 20 movies
};

const MovieList = () => {
  const [movies, setMovies] = useState({});
  const [years, setYears] = useState({ previousYear: 2012, currentYear: 2012, nextYear: 2013 });
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const loadInitialMovies = async () => {
      const initialMovies = await fetchMovies(2012, selectedGenres);
      setMovies({ 2012: initialMovies });
    };
    loadInitialMovies();
  }, [selectedGenres]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, []);

  const fetchMoviesForYear = async (year) => {
    if (loading) return;

    setLoading(true);
    const moviesForYear = await fetchMovies(year, selectedGenres);
    setMovies((prevMovies) => ({
      ...prevMovies,
      [year]: moviesForYear,
    }));
    setLoading(false);
  };

  const handleScroll = (entry) => {
    const { isIntersecting, target } = entry;
    if (!isIntersecting) return;

    const { id } = target.dataset;

    if (parseInt(id) < years.currentYear && !loading) {
      const newPreviousYear = years.previousYear - 1;
      fetchMoviesForYear(newPreviousYear);
      setYears((prevYears) => ({
        previousYear: newPreviousYear,
        currentYear: prevYears.previousYear,
        nextYear: prevYears.currentYear,
      }));
    } else if (parseInt(id) > years.currentYear && !loading) {
      const newNextYear = years.nextYear + 1;
      fetchMoviesForYear(newNextYear);
      setYears((prevYears) => ({
        previousYear: prevYears.currentYear,
        currentYear: prevYears.nextYear,
        nextYear: newNextYear,
      }));
    }
  };

  const { ref: topSentinelRef } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView) handleScroll({ target: { dataset: { id: years.previousYear } }, isIntersecting: inView });
    },
  });

  const { ref: bottomSentinelRef } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView) handleScroll({ target: { dataset: { id: years.nextYear } }, isIntersecting: inView });
    },
  });

  const toggleGenre = async (genreId) => {
    setMovies({});
    setYears({ previousYear: 2011, currentYear: 2012, nextYear: 2013 });
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genreId) ? prevSelected.filter((id) => id !== genreId) : [...prevSelected, genreId]
    );

    const moviesForYear = await fetchMovies(2012, selectedGenres);
    setMovies({ 2012: moviesForYear });
  };

  return (
    <div className="movie-list">
      <MovieGenre genres={genres} selectedGenres={selectedGenres} toggleGenre={toggleGenre} />
      {Object.keys(movies).length === 0 && loading ? (
        <Skeleton count={10} height={300} /> // Display 10 skeleton cards while loading
      ) : (
        Object.keys(movies)
          .sort((a, b) => a - b)
          .map((year) => (
            <div key={year} className="year-section">
              <h2>{year}</h2>
              <div className="movies">
                {movies[year].map((movie) => (
                  <MovieCard key={movie.id} movie={movie} genres={genres} />
                ))}
              </div>
            </div>
          ))
      )}
      {loading && <p>Loading...</p>}
      <div data-id={years.previousYear} ref={topSentinelRef} style={{ height: '1px' }} />
      <div data-id={years.nextYear} ref={bottomSentinelRef} style={{ height: '1px' }} />
    </div>
  );
};

export default MovieList;
