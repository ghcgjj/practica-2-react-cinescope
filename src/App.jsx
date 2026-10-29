import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>CineScope</span>
        <span>Explora historias. Guarda tus favoritas.</span>
        <span className="footer-credit">Datos de películas: TMDB</span>
      </footer>
    </div>
  );
}
