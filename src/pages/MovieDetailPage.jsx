import movies from "../data/movies.json"
import { Link, useParams } from "react-router-dom"
import { IoMdArrowBack } from "react-icons/io"

export default function MovieDetailPage(){
    const { id } = useParams()

    const filme = movies.find(filme => filme.id === parseInt(id))

    if (!filme) {
        return <p>Filme não encontrado!</p>;
    }


    return(
        <>
            <Link to='/movies'>
                <button className="text-blue-600 ml-2 mt-3 delay-300 hover:opacity-80">
                    <IoMdArrowBack size={30}/>
                </button>
            </Link>
            <div className="flex flex-col items-center justify-center p-2">
                <h1 className="text-2xl font-bold mb-3 self-start">{filme.titulo}</h1>
                <div className="flex gap-24 w-full mb-2">
                    <img 
                        src={`/${filme.imagem_destaque}`}
                        alt={filme.titulo} 
                        className="w-full h-80 object-cover rounded-md"
                    />
                    <img 
                        src={`/${filme.imagem_destaque}`}
                        alt={filme.titulo} 
                        className="w-full h-80 object-cover rounded-md"
                    />
                </div>
                <p className="text-base self-start"><strong>Sinopse:</strong> {filme.descricao}</p>
                <div className="flex justify-center items-baseline gap-40 self-start">
                    <div>
                        <p className="text-gray-500"><strong>Direção:</strong><br /> {filme.diretor}</p>
                        <p className="text-gray-500"><strong>Elenco:</strong><br /> {filme.elenco.join(', ')}</p>
                    </div>
                    <div>
                        <p className="mt-4 text-gray-500"><strong>Ano de lançamento:</strong><br /> {filme.ano_lancamento}</p>
                        <p className="text-gray-500"><strong>Avaliação:</strong><br /> {filme.avaliacao}</p>
                    </div>
                </div>
                {/* Adicione mais informações do filme conforme necessário */}
            </div>
        </>
    )
}