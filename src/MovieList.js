import React, { useEffect, useState } from 'react';
import axios from 'axios';

import moviePoster from './logo.svg';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.trakt.tv/movies/popular', {
        headers: {
          'Content-Type': 'application/json',
          'trakt-api-version': '2',
          'trakt-api-key': '63ec3574fa9205de98e0b7563e3bcb3e71391c74cb518149c746db67978b1ccd' // Clave de API de Trakt
        }
      })
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      axios
        .get(`https://api.trakt.tv/movies/${selectedMovie.id}/recommendations`, {
          headers: {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': '63ec3574fa9205de98e0b7563e3bcb3e71391c74cb518149c746db67978b1ccd' // Clave de API de Trakt
          }
        })
        .then(response => {
          setRecommendations(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedMovie]);

  const handleMovieDetails = movie => {
    setSelectedMovie(movie);
  };

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">Lista de películas</h1>
      {selectedMovie && (
        <div className="movie-details">
          <img className="portada" src={moviePoster} alt={selectedMovie.title} />
          <div className="movie-details-content">
            <h2 className="movie-details-title">{selectedMovie.title}</h2>
            <p className="movie-details-runtime">Duración: {selectedMovie.runtime} minutos</p>
            <p className="movie-details-overview">Resumen: {selectedMovie.overview}</p>
            <button className="movie-details-button" onClick={() => setSelectedMovie(null)}>
              Cerrar detalles
            </button>
          </div>
          <div className="recommendations">
            <h3 className="recommendations-title">Recomendaciones:</h3>
            <div className="recommendations-list">
              {recommendations.map(recommendation => (
                <div className="recommendation" key={recommendation.id}>
                  <img className="recommendation-poster" src={recommendation.poster} alt={recommendation.title} />
                  <p className="recommendation-title">{recommendation.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="movie-list">
        {movies.map(movie => (
          <div className="movie-card" key={movie.id} onClick={() => handleMovieDetails(movie)}>
            <img className="movie-card-poster" src={moviePoster} alt={movie.title} />
            <h2 className="movie-card-title">{movie.title}</h2>
            <p className="movie-card-runtime">Duración: {movie.runtime} minutos</p>
            <button className="movie-card-button">Ver detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
