import { NavLink } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext.jsx';

export default function NavBar() {
  const { favorites } = useMovieContext();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" aria-label="CineScope, ir al inicio">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span className="brand-name">cine<span>scope</span></span>
        </NavLink>
        <nav className="nav-links" aria-label="Navegación principal">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Explorar
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Favoritos <span className="favorites-count">{favorites.length}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
