import CardContainer from "../components/CardContainer";
import CarrosselPopulares from "../components/CarrosselPopulares";
import CarrosselSeries from "../components/CarrosselSeries";
import CarrosselUpComing from "../components/CarrosselUpComing";

export default function Home() {
    return (
        <>
            <CardContainer titulo="Filmes mais populares no momento">
                <CarrosselPopulares />
            </CardContainer>

            <CardContainer titulo="Filmes que estão por vir">
                <CarrosselUpComing />
            </CardContainer>

            <CardContainer titulo="Series mais populares">
                <CarrosselSeries />
            </CardContainer>
        </>
    )
}