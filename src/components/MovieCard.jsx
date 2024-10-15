import { Link, useNavigate } from "react-router-dom";

export default function MovieCard({ id, title, poster_path }) {
    const navigate = useNavigate()

    const addToWatchLater = () => {
        const movie = { id, title, poster_path } // Criando o objeto filme
        let watchLaterMovies = JSON.parse(localStorage.getItem('watchLaterMovies')) || []
        
        // Verifica se o filme já não está na lista
        const alreadyInList = watchLaterMovies.some(m => m.id === movie.id)
        if (!alreadyInList) {
            watchLaterMovies.push(movie)
            localStorage.setItem('watchLaterMovies', JSON.stringify(watchLaterMovies))
            navigate('/mylist') // Redireciona para a página 'mylist'
        }
    }

    return (
        <div className="
            h-64 w-40 
            flex flex-col items-center 
            p-2  
            transition-all
            delay-100
            hover:scale-105 hover:shadow-sm hover:bg-gray-700 hover:rounded-md
        ">
            <img 
                src={`https://image.tmdb.org/t/p/w1280${poster_path}`} 
                alt={title} 
                className="h-40 w-full object-cover" 
            />
            <h2 className="text-xs text-center">{title}</h2>
            <Link to={`/movies/${id}`} className="text-blue-500 mt-1 text-xs">Saber mais</Link>
            <button className="h-auto w-10 text-center text-xs bg-zinc-950 rounded-2xl" onClick={addToWatchLater}>Add</button>
        </div>
    );
}
