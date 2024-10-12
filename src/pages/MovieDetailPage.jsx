import movies from "../data/movies.json"
import { Link, useParams } from "react-router-dom"

export default function MovieDetailPage(){
    const { id } = useParams()

    const filme = movies.find(filme => filme.id === parseInt(id))

    if (!filme) {
        return <p>Filme não encontrado!</p>;
    }


    return(
        <>
            <Link to='/movies'>
                <button className="text-blue-600 m-4">Voltar</button>
            </Link>
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">{filme.titulo}</h1>
                <img 
                    src={`/${filme.imagem_destaque}`}
                    alt={filme.titulo} 
                    className="w-full h-80 object-cover rounded-md mb-4"
                />
                <p className="text-lg">{filme.descricao}</p>
                <p className="text-gray-500">Direção: {filme.diretor}</p>
                <p className="text-gray-500">Elenco: {filme.elenco}</p>
                <p className="mt-4 text-gray-500">Ano de lançamento: {filme.ano_lancamento}</p>
                <p className="text-gray-500">Avaliação: {filme.avaliacao}</p>
                {/* Adicione mais informações do filme conforme necessário */}
            </div>
        </>
    )
}