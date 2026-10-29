import { useCallback, useEffect, useState } from 'react';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import MovieGrid from '../components/MovieGrid.jsx';
import { getPopularMovies, searchMovies as searchMoviesApi } from '../services/tmdb.js';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);

  const loadPopularMovies = useCallback(async () => {
    setLoading(true);
    setError('');
    setActiveSearch(false);
    try {
      const results = await getPopularMovies();
      setMovies(results);
    } catch (requestError) {
      setError(requestError.message || 'No se han podido cargar las películas.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPopularMovies();
  }, [loadPopularMovies]);

  async function searchFor(queryValue) {
    const query = queryValue.trim();
    if (!query) {
      await loadPopularMovies();
      return;
    }

    setLoading(true);
    setError('');
    setActiveSearch(true);
    try {
      const results = await searchMoviesApi(query);
      setMovies(results);
    } catch (requestError) {
      setError(requestError.message || 'No se ha podido completar la búsqueda.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    searchFor(searchQuery);
  }

  function clearSearch() {
    setSearchQuery('');
    loadPopularMovies();
  }

  return (
    <div className="page-container home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> TU PRÓXIMA HISTORIA EMPIEZA AQUÍ</span>
          <h1>Un universo de películas.<br /><span>Encuentra la tuya.</span></h1>
          <p>Explora grandes historias, descubre nuevos títulos y guarda tus imprescindibles en un solo lugar.</p>
          <form className="search-form" onSubmit={handleSearch} role="search">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <label className="visually-hidden" htmlFor="movie-search">Buscar películas por título</label>
            <input
              id="movie-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Busca una película..."
              autoComplete="off"
            />
            {searchQuery && <button type="button" className="clear-search" onClick={() => setSearchQuery('')} aria-label="Borrar búsqueda">×</button>}
            <button type="submit" className="search-button">Buscar <span aria-hidden="true">↗</span></button>
          </form>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-disc"><span>▶</span></div>
          <span className="art-star star-one">✦</span>
          <span className="art-star star-two">✧</span>
          <span className="art-caption">LIGHTS · CAMERA · ACTION</span>
        </div>
      </section>

      <section className="results-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">CATÁLOGO</span>
            <h2>{activeSearch ? 'Resultados de búsqueda' : 'Películas populares'}</h2>
            <p>{activeSearch ? `Resultados para “${searchQuery.trim()}”` : 'Lo que está viendo todo el mundo ahora mismo.'}</p>
          </div>
          {activeSearch && <button type="button" className="text-button" onClick={clearSearch}>Ver populares <span aria-hidden="true">→</span></button>}
        </div>

        {loading ? <LoadingState label={activeSearch ? 'Buscando películas...' : 'Cargando películas populares...'} /> : null}
        {!loading && error ? <ErrorState message={error} onRetry={activeSearch ? () => searchFor(searchQuery) : loadPopularMovies} /> : null}
        {!loading && !error ? <MovieGrid movies={movies} /> : null}
      </section>
    </div>
  );
}
