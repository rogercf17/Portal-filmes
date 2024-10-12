import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"


export default function MovieListPage() {

    const [search, setSearch] = useState("")
    const [filmes, setFilmes] = useState([])

    useEffect( () => {
        fetch(
            'https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br'
        )
            .then( data => data.json())
            .then( res => setFilmes(res.results))
            .catch( error => console.log(error))
            .finally( () => console.log('Fim'))
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value)
        console.log(search)
    }

    const filmesFiltrados = filmes.filter(filme => filme.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="flex flex-col items-center justify-center mb-10">
            <h2 className="mt-4">Veja o catálogo completo de filmes</h2>
            <input
                className="text-black mb-2 rounded-md pl-2"
                type="search"
                id="search"
                value={search}
                onChange={handleSearch}
            />
            <section className="grid grid-cols-5 gap-x-10">
                {
                    filmesFiltrados.length > 0 
                        ?
                        filmes
                            .map(filme => (
                                <MovieCard key={filme.id} {...filme} />
                            ))
                        :
                        <p>Filme não encontrado</p>
                }
            </section>
        </div>
    )
}

