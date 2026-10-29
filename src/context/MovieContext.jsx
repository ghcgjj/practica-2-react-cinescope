import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const MovieContext = createContext(null);
const STORAGE_KEY = 'cinescope-favorites-v1';

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = window.localStorage.getItem(STORAGE_KEY);
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavorites)) setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.warn('No se pudieron recuperar los favoritos guardados.', error);
    } finally {
      setFavoritesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.warn('No se pudieron guardar los favoritos.', error);
    }
  }, [favorites, favoritesLoaded]);

  const toggleFavorite = useCallback((movie) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some((favorite) => favorite.id === movie.id);
      return alreadyFavorite
        ? currentFavorites.filter((favorite) => favorite.id !== movie.id)
        : [...currentFavorites, movie];
    });
  }, []);

  const isFavorite = useCallback(
    (movieId) => favorites.some((movie) => movie.id === movieId),
    [favorites],
  );

  const value = { favorites, toggleFavorite, isFavorite, favoritesLoaded };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext debe utilizarse dentro de MovieProvider.');
  }
  return context;
}
