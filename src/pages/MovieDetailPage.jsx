import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { IoMdArrowBack } from "react-icons/io"

export default function MovieDetailPage(){
    const { id } = useParams()
    const [filme, setFilme] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [trailer, setTrailer] = useState(null)

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`
        )
        .then(res => res.json())
        .then(data => {
            setFilme(data)
            setLoading(false)
        })
        .catch(error => {
            console.error("Erro ao buscar o filme:", error)
            setError(error)
            setLoading(false)
        })
    }, [id])

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`
        )
        .then(res => res.json())
        .then(data => {
            const diretor = data.crew.find(member => member.job === 'Director')
            const elenco = data.cast.map(actor => actor.name).slice(0, 5) 
            setFilme(prevState => ({
                ...prevState,
                director: diretor ? diretor.name : 'N/A',
                cast: elenco
            }))
        })
        .catch(error => console.error("Erro ao buscar créditos do filme:", error))
    }, [id])

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`
        )
        .then(res => res.json())
        .then(data => {
            // Inclui 'Teaser' e 'Clip' como tipos válidos, além de 'Trailer'
            const trailerVideo = data.results.find(video => 
                (video.type === 'Trailer' || video.type === 'Teaser' || video.type === 'Clip') 
                && video.site === 'YouTube'
            )
            if (trailerVideo) {
                setTrailer(`https://www.youtube.com/embed/${trailerVideo.key}`)
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o trailer do filme:", error)
        })
    }, [id])

    if (loading) {
        return <p>Carregando...</p>
    }

    if (error || !filme) {
        return <p>Filme não encontrado!</p>
    }

    return (
        <>
            <Link to='/movies'>
                <button className="text-blue-600 ml-2 mt-3 delay-300 hover:opacity-80">
                    <IoMdArrowBack size={30}/>
                </button>
            </Link>
            <div className="flex flex-col items-center justify-center p-2">
                <h1 className="text-2xl font-bold mb-3 self-start">{filme.title}</h1>
                <div className="flex gap-24 w-full mb-2">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}
                        alt={filme.title} 
                        className="w-full h-80 object-cover rounded-md"
                    />
                    {trailer ? (
                        <iframe
                            width="100%"
                            height="320px"
                            src={trailer}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Trailer"
                        ></iframe>
                    ) : (
                        <p className="text-gray-500 mt-5">Trailer não disponível para este filme.</p>
                    )}
                </div>
                <p className="text-base self-start"><strong>Sinopse:</strong> {filme.overview}</p>
                <div className="flex justify-center items-baseline gap-40 self-start">
                    <div>
                        <p className="text-gray-500"><strong>Direção:</strong><br /> {filme.director}</p>
                        <p className="text-gray-500"><strong>Elenco:</strong><br /> {filme.cast && filme.cast.join(', ')}</p>
                    </div>
                    <div>
                        <p className="mt-4 text-gray-500"><strong>Ano de lançamento:</strong><br /> {new Date(filme.release_date).getDate()}</p>
                        <p className="text-gray-500"><strong>Avaliação:</strong><br /> {filme.vote_average.toFixed(1)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
