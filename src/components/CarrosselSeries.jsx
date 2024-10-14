import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CarrosselSeries() {
    const [series, setSeries] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect( () => {
        const fetchSeries = async () => {
            try{
                const res = await fetch(
                    'https://api.themoviedb.org/3/tv/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br'
                )
                const data = await res.json()
                const sortedSeries = data.results
                    .sort((a, b) => a.popularity - b.popularity)
                    .slice(0, 10)
                setSeries(sortedSeries)
            }catch (erro) {
                console.error(`Erro: ${erro}`)
            }
        }

        fetchSeries()
    }, []) 

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
        prevIndex === series.length - 1 ? 0 : prevIndex + 1
        )
    }
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? series.length - 1 : prevIndex - 1
        )
    }

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000)
        return () => clearInterval(interval)
    }, [series])

    if (series.length === 0) {
        return <div>Carregando...</div>
    }

    return(
        <div className="relative w-full max-w-4xl mx-auto self-center mb-10">
            <div className="overflow-hidden rounded-lg">
                <div 
                className="flex transition-transform duration-500 ease-out" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                {series.map((serie) => (
                    <div key={serie.id} className="w-full flex-shrink-0 relative">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`} 
                        alt={serie.original_name} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                        <h3 className="text-xl font-bold">{serie.original_name}</h3>
                        <p className="text-sm">Data de lançamento: {serie.first_air_date}</p>
                        <p className="text-sm">Avaliação: {serie.vote_average.toFixed(1)}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <button 
                onClick={prevSlide} 
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/60 rounded-full p-2 hover:bg-white/80"
            >
                <ChevronLeft size={24} fill="#000"/>
            </button>
            <button 
                onClick={nextSlide} 
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/60 rounded-full p-2 hover:bg-white/80"
            >
                <ChevronRight size={24} fill="#000"/>
            </button>
            
            <div className="absolute bottom-4 left-0 right-0">
                <div className="flex items-center justify-center gap-2">
                {series.map((_, index) => (
                    <div
                    key={index}
                    className={`
                        transition-all w-3 h-3 bg-white rounded-full
                        ${currentIndex === index ? "p-2" : "bg-opacity-50"}
                    `}
                    />
                ))}
                </div>
            </div>
        </div>
    )
}