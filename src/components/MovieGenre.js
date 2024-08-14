import React from 'react';

const MovieGenre = ({ genres, selectedGenres, toggleGenre }) => {
  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={selectedGenres.includes(genre.id) ? 'active' : ''}
          onClick={() => toggleGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default MovieGenre;
