import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarrosselFilmesFuturos() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br'
        );
        const data = await response.json();
        const currentDate = new Date();
        const upcomingMovies = data.results
          .filter(movie => new Date(movie.release_date) > currentDate)
          .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
          .slice(0, 5);
        setMovies(upcomingMovies);
      } catch (error) {
        console.error('Erro ao buscar filmes futuros:', error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) {
    return <div className="text-center">Carregando filmes futuros...</div>;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-10">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div 
          className="flex transition-transform duration-500 ease-out" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="w-full flex-shrink-0 relative">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                alt={movie.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <h3 className="text-xl font-bold">{movie.title}</h3>
                <p className="text-sm">Data de Lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={prevSlide} 
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/60 rounded-full p-2 hover:bg-white/80"
      >
        <ChevronLeft size={24} fill="#000" />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/60 rounded-full p-2 hover:bg-white/80"
      >
        <ChevronRight size={24} fill="#000" />
      </button>
      
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {movies.map((_, index) => (
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
  );
};