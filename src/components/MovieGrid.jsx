import MovieCard from './MovieCard.jsx';

export default function MovieGrid({ movies }) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">⌕</div>
        <h3>No hay películas que mostrar</h3>
        <p>Prueba otra búsqueda o vuelve a explorar las películas populares.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}
