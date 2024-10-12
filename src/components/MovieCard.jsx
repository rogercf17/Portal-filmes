import { Link } from "react-router-dom";

export default function MovieCard({ id, titulo, imagem_destaque }) {
    return (
        <div className="
            h-64 w-40 
            flex flex-col items-center 
            p-3  
            transition-all
            delay-100
            hover:scale-105 hover:shadow-sm hover:bg-gray-700 hover:rounded-md
        ">
            
            <img 
                src={imagem_destaque} 
                alt={titulo} 
                className="h-40 w-full object-cover" 
            />
            <h2 className="text-xs text-center">{titulo}</h2>
            <Link to={`/movies/${id}`} className="text-blue-500 mt-2">Saber mais</Link>
        </div>
    );
}
