import React from 'react';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import the CSS for Skeleton

const MovieCard = ({ movie, genres }) => {
  const movieGenres = movie?.genre_ids
    ?.map((id) => genres.find((genre) => genre.id === id)?.name)
    .join(', ');

  return (
    <div className="movie-card">
      {movie ? (
        <>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-dis">{movie.overview}</p>
          <p className="movie-over">
            <strong>Genres:</strong> {movieGenres}
          </p>
          <p className="movie-over">
            <strong>Popularity:</strong> {movie.popularity}
          </p>
          <p className="movie-over">
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </>
      ) : (
        <>
          <Skeleton height={300} />
          <h3 className="movie-title">
            <Skeleton width={200} />
          </h3>
          <p className="movie-dis">
            <Skeleton count={3} />
          </p>
          <p className="movie-over">
            <Skeleton width={150} />
          </p>
          <p className="movie-over">
            <Skeleton width={100} />
          </p>
          <p className="movie-over">
            <Skeleton width={100} />
          </p>
        </>
      )}
    </div>
  );
};

export default MovieCard;
