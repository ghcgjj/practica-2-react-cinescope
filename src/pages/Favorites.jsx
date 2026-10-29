import { Link } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid.jsx';
import { useMovieContext } from '../context/MovieContext.jsx';

export default function Favorites() {
  const { favorites, favoritesLoaded } = useMovieContext();

  return (
    <div className="page-container favorites-page">
      <section className="favorites-heading">
        <span className="section-kicker">TU COLECCIÓN PERSONAL</span>
        <div className="favorites-title-row">
          <div>
            <h1>Tus favoritos<span className="title-accent">.</span></h1>
            <p>Las historias que quieres tener siempre a mano.</p>
          </div>
          <div className="collection-count"><strong>{favorites.length.toString().padStart(2, '0')}</strong><span>PELÍCULAS</span></div>
        </div>
      </section>

      {!favoritesLoaded ? (
        <div className="loading-state" role="status"><span className="loading-spinner" aria-hidden="true" /> Cargando tus favoritos...</div>
      ) : favorites.length ? (
        <MovieGrid movies={favorites} />
      ) : (
        <div className="empty-favorites">
          <div className="empty-heart" aria-hidden="true">♡</div>
          <h2>Aún no has guardado ninguna película</h2>
          <p>Cuando encuentres una película que te guste, pulsa el corazón de su tarjeta y aparecerá aquí.</p>
          <Link className="primary-link" to="/">Explorar películas <span aria-hidden="true">→</span></Link>
        </div>
      )}
    </div>
  );
}
