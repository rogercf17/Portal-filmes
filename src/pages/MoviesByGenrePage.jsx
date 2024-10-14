import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { IoMdArrowBack } from "react-icons/io";

export default function MoviesByGenrePage() {
  const [movies, setMovies] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br&with_genres=${id}`
    )
      .then(data => data.json())
      .then(res => setMovies(res.results))
      .catch(error => console.log(error))
      .finally(() => console.log('Fim'));
  }, [id]);

  return (
    <div className="flex flex-col gap-1">
        <Link to='/genre'>
            <button className="text-blue-600 ml-2 mt-3 delay-300 hover:opacity-80">
                <IoMdArrowBack size={30}/>
            </button>
        </Link>
        <h2 className="text-white">{movies.genre_name}</h2>
        <section className="grid grid-cols-5 gap-x-5 gap-y-2 mb-10 w-full pl-5">
            
            {movies.length > 0 ? (
                movies.map(movie => (
                <MovieCard key={movie.id} {...movie} />
                ))
            ) : (
                <p>Nenhum filme encontrado</p>
            )}
        </section>
    </div>
  );
}