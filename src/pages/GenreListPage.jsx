import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GenreList() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br'
    )
      .then(data => data.json())
      .then(res => setGenres(res.genres))
      .catch(erro => console.error(`Erro: ${erro}`))
      .finally(() => console.log('Fim'));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <h2 className="my-4">Lista de Gêneros</h2>
      <ul className="
        w-full 
        flex flex-col 
        
        bg-zinc-950 
        rounded-e-full
        p-2
        gap-1
        list-disc
      ">
        {genres.map(genre => (
          <li key={genre.id} className="hover:opacity-70">
            <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}