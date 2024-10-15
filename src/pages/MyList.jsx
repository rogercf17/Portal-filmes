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
        const storedWatchLaterMovies = JSON.parse(localStorage.getItem('watchLaterMovies')) || []
        setWatchLaterMovies(storedWatchLaterMovies)
        console.log('Filmes para ver depois carregados:', storedWatchLaterMovies) // Debug
    }, [])

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
            <h2 className='text-center text-xl font-bold mb-2'>{title}</h2>
            {movies.length === 0 ? (
                <p>Nenhum filme na lista.</p>
            ) : (
                <ul className='flex flex-col gap-2'>
                    {movies.map(movie => (
                        <li key={movie.id} className='
                            w-full h-auto 
                            bg-zinc-950
                            flex flex-col
                            p-2
                            gap-1
                        '>
                            <Link to={`/movies/${movie.id}`} className='text-sm'>{movie.title}</Link>
                            <button onClick={() => removeMovie(movie.id, listType)} className='bg-red-700 w-2/4 self-center rounded-sm text-xs'>Remover</button>
                            {listType === 'watched' ? (
                                <button onClick={() => addToWatchLater(movie)} className='bg-blue-700 w-2/4 self-center rounded-sm text-xs'>Mover para Ver Depois</button>
                            ) : (
                                <button onClick={() => addToWatched(movie)} className='bg-blue-700 w-2/4 self-center rounded-sm text-xs'>Marcar como Assistido</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-2xl'>Minha Lista</h1>
            <div className='flex justify-around w-full'>
                <MovieList movies={watchedMovies} title="Filmes Assistidos" listType="watched" />
                <MovieList movies={watchLaterMovies} title="Filmes para Ver Depois" listType="watchLater" />
            </div>
        </div>
    );
}