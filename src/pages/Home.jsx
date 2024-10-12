import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";
import movies from "../data/movies.json";
export default function Home() {

    return (
        <>
            <CardContainer titulo="Filmes mais populares">
                {
                    movies
                        .filter(filme => (filme.avaliacao > 8.8))
                        .map(filme => (
                            <MovieCard key={filme.id} {...filme} />
                        ))
                }
            </CardContainer>

        </>
    )
}