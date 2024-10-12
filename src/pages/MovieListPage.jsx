import { useState } from "react"
import MovieCard from "../components/MovieCard"
import movies from "../data/movies.json"

export default function MovieListPage() {

    const [search, setSearch] = useState("")

    const handleSearch = (event) => {
        setSearch(event.target.value)
        console.log(search)
    }

    const filmesFiltrados = movies.filter(filme => filme.titulo.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="flex flex-col items-center justify-center">
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
                    filmesFiltrados.length > 0 ?

                        filmesFiltrados
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

