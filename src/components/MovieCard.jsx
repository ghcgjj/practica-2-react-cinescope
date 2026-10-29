import { useMovieContext } from '../context/MovieContext.jsx';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'Año desconocido';
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null;

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {posterUrl ? (
          <img
            className="movie-poster"
            src={posterUrl}
            alt={`Póster de ${movie.title || movie.original_title || 'la película'}`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
              event.currentTarget.nextElementSibling?.classList.add('visible');
            }}
          />
        ) : null}
        <div className={`poster-fallback${posterUrl ? '' : ' visible'}`} aria-hidden="true">
          <span className="fallback-icon">▶</span>
          <span>Sin póster disponible</span>
        </div>
        <div className="poster-overlay" />
        <button
          type="button"
          className={`favorite-button${favorite ? ' is-favorite' : ''}`}
          onClick={() => toggleFavorite(movie)}
          aria-label={favorite ? `Quitar ${movie.title} de favoritos` : `Añadir ${movie.title} a favoritos`}
          aria-pressed={favorite}
          title={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <span aria-hidden="true">{favorite ? '♥' : '♡'}</span>
        </button>
        {Number.isFinite(movie.vote_average) && movie.vote_average > 0 && (
          <span className="rating-pill" aria-label={`Valoración ${movie.vote_average.toFixed(1)} sobre 10`}>
            <span aria-hidden="true">★</span> {movie.vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title" title={movie.title || movie.original_title}>
          {movie.title || movie.original_title || 'Título desconocido'}
        </h3>
        <span className="movie-year">{year}</span>
      </div>
    </article>
  );
}
