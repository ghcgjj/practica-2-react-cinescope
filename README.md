# CineScope - Explorador de películas con React

Aplicación web desarrollada para la Práctica de Evaluación Continua 2 de **Diseño y despliegue de aplicaciones multiplataforma**. Consume la API de The Movie Database (TMDB), permite buscar películas, ver las populares y administrar una colección de favoritos persistente.

## Funcionalidades

- Carga inicial de películas populares desde `GET /movie/popular`.
- Búsqueda por título mediante `GET /search/movie?query=...`.
- Indicadores de carga y mensajes de error diferenciados (configuración, conexión, API key y límite de peticiones).
- Tarjetas con póster, título, año, valoración y botón de favorito con estado visual.
- Página de favoritos en `/favorites`, con estado vacío cuando aún no hay películas guardadas.
- Favoritos compartidos globalmente mediante Context API y persistidos en `localStorage`.
- Navegación con React Router, diseño adaptable a móvil/tablet/escritorio y controles accesibles.

## Requisitos

- Node.js 18 o superior.
- Una API key de TMDB. Consulta la [documentación oficial](https://developer.themoviedb.org/docs) y crea una cuenta en [TMDB](https://www.themoviedb.org/).

## Instalación y ejecución

1. Abre una terminal dentro de esta carpeta.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Copia `.env.example` y crea un archivo llamado `.env` en la raíz del proyecto. En Windows puedes hacerlo desde el Explorador o ejecutar `copy .env.example .env` en CMD.
4. Abre `.env` y sustituye el texto de ejemplo por tu clave API v3:

   ```env
   VITE_TMDB_API_KEY=tu_clave_api_de_TMDB
   ```

5. Arranca el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abre la URL local que indique Vite (normalmente `http://localhost:5173`). Si cambias el archivo `.env` con el servidor activo, reinicia `npm run dev`.

Para comprobar la versión de producción ejecuta `npm run build`. El contenido generado quedará en `dist/`.

## Estructura del proyecto

```text
src/
├── components/
│   ├── ErrorState.jsx
│   ├── LoadingState.jsx
│   ├── MovieCard.jsx
│   ├── MovieGrid.jsx
│   └── NavBar.jsx
├── context/
│   └── MovieContext.jsx
├── pages/
│   ├── Favorites.jsx
│   └── Home.jsx
├── services/
│   └── tmdb.js
├── App.jsx
├── main.jsx
└── styles.css
.env.example
.gitignore
index.html
package.json
```

## Decisiones técnicas

- `MovieContext` centraliza la lectura, modificación y persistencia de favoritos. La escritura en `localStorage` espera a que termine la lectura inicial para evitar sobrescribir los datos guardados al arrancar.
- `tmdb.js` concentra las peticiones HTTP y la gestión de errores para evitar duplicar código en las páginas.
- `Home` carga las películas populares al montarse y permite enviar búsquedas mediante un formulario.
- `MovieCard` presenta una imagen alternativa cuando una película no tiene póster disponible. El botón de favorito es accesible por teclado y ofrece estado mediante `aria-pressed`.
- La API key se lee desde `import.meta.env.VITE_TMDB_API_KEY`. `.env` está excluido mediante `.gitignore`; solo se incluye `.env.example` como plantilla. Importante: las variables `VITE_` se incorporan al código que recibe el navegador y no son secretos frente al usuario final. No subas el archivo `.env` al repositorio y, para un despliegue público con controles de seguridad estrictos, considera realizar las peticiones desde un backend.

## Publicar el código en GitHub

1. Crea un repositorio vacío en GitHub, por ejemplo `practica-2-react-cinescope`.
2. Asegúrate de que `.env` no aparece entre los archivos que vas a subir. No publiques tu clave API.
3. Desde la carpeta del proyecto ejecuta, sustituyendo la URL por la de tu repositorio:

   ```bash
   git init
   git add .
   git commit -m "Completa práctica 2: explorador de películas con React"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/practica-2-react-cinescope.git
   git push -u origin main
   ```

4. Entrega el enlace real del repositorio junto con `Memoria_Practica_2_React.pdf`.

## Reconocimiento de datos

Esta aplicación utiliza la API y las imágenes de TMDB. Consulta sus condiciones de uso y atribución en la documentación oficial antes de publicar la aplicación.
