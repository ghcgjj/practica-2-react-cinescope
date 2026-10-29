const API_BASE_URL = 'https://api.themoviedb.org/3';

function getApiKey() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY?.trim();
  if (!apiKey || apiKey === 'PEGA_AQUI_TU_API_KEY') {
    throw new Error(
      'Falta configurar la API key de TMDB. Crea un archivo .env en la raíz del proyecto y añade VITE_TMDB_API_KEY=tu_clave.',
    );
  }
  return apiKey;
}

async function request(endpoint, params = {}) {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.search = new URLSearchParams({
    api_key: getApiKey(),
    language: 'es-ES',
    ...params,
  }).toString();

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('No se ha podido conectar con TMDB. Comprueba tu conexión e inténtalo de nuevo.');
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('TMDB ha rechazado la API key. Comprueba que sea válida y que esté bien copiada en .env.');
    }
    if (response.status === 429) {
      throw new Error('Se han realizado demasiadas peticiones. Espera un momento y vuelve a intentarlo.');
    }
    throw new Error(`No se pudieron cargar las películas (error ${response.status}). Inténtalo de nuevo.`);
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

export function getPopularMovies() {
  return request('/movie/popular', { page: '1' });
}

export function searchMovies(query) {
  return request('/search/movie', { query: query.trim(), page: '1', include_adult: 'false' });
}
