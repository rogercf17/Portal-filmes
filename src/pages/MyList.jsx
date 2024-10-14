import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyList() {
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [watchLaterMovies, setWatchLaterMovies] = useState([]);

    useEffect(() => {
        // Carregar as listas do LocalStorage quando o componente montar
        const storedWatchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        const storedWatchLaterMovies = JSON.parse(localStorage.getItem('watchLaterMovies')) || [];
        setWatchedMovies(storedWatchedMovies);
        setWatchLaterMovies(storedWatchLaterMovies);
    }, []);

    useEffect(() => {
        // Salvar as listas no LocalStorage sempre que forem atualizadas
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        localStorage.setItem('watchLaterMovies', JSON.stringify(watchLaterMovies));
    }, [watchedMovies, watchLaterMovies]);

    const addToWatched = (movie) => {
        setWatchedMovies(prevMovies => [...prevMovies, movie]);
        setWatchLaterMovies(prevMovies => prevMovies.filter(m => m.id !== movie.id));
    };

    const addToWatchLater = (movie) => {
        setWatchLaterMovies(prevMovies => [...prevMovies, movie]);
        setWatchedMovies(prevMovies => prevMovies.filter(m => m.id !== movie.id));
    };

    const removeMovie = (movieId, list) => {
        if (list === 'watched') {
            setWatchedMovies(prevMovies => prevMovies.filter(m => m.id !== movieId));
        } else {
            setWatchLaterMovies(prevMovies => prevMovies.filter(m => m.id !== movieId));
        }
    };

    const MovieList = ({ movies, title, listType }) => (
        <div>
            <h2>{title}</h2>
            {movies.length === 0 ? (
                <p>Nenhum filme na lista.</p>
            ) : (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                            <button onClick={() => removeMovie(movie.id, listType)}>Remover</button>
                            {listType === 'watched' ? (
                                <button onClick={() => addToWatchLater(movie)}>Mover para Ver Depois</button>
                            ) : (
                                <button onClick={() => addToWatched(movie)}>Marcar como Assistido</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div>
            <h1>Minha Lista</h1>
            <MovieList movies={watchedMovies} title="Filmes Assistidos" listType="watched" />
            <MovieList movies={watchLaterMovies} title="Filmes para Ver Depois" listType="watchLater" />
        </div>
    );
}