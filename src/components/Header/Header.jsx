import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoutIcon from '../../../images/logout.svg';
import burgerIcon from '../../../images/menu.svg'; // Tu ícono de hamburguesa
import closeIcon from '../../../images/close.svg';   // Ícono para cerrar el menú

function Header({ onOpenPopup, currentUser, onLogout, isPopupOpen }) {
  const location = useLocation();
  const isLoggedIn = Boolean(currentUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${menuOpen ? 'header_open' : ''} ${isPopupOpen ? 'header_hidden' : ''}`}>
      <div className="header_center">
        <h3 className="header__logo">NewsExplorer</h3>

        <button className="header__burger" onClick={toggleMenu}>
          <img
            src={menuOpen ? closeIcon : burgerIcon}
            alt="Menú"
            className="header__burger-icon"
          />
        </button>

        <nav className={`header__nav ${menuOpen ? 'header__nav_open' : ''}`}>
          <Link
            to="/"
            className={`header__link ${location.pathname === '/' ? 'header__link_active' : ''}`}
            onClick={closeMenu}
          >
            Inicio
          </Link>

          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`header__link ${location.pathname === '/saved-news' ? 'header__link_active' : ''}`}
              onClick={closeMenu}
            >
              Artículos guardados
            </Link>
          )}

          {isLoggedIn ? (
            <button className="header__button header__button_logged-in" onClick={() => { onLogout(); closeMenu(); }}>
              {currentUser.name}
              <img src={logoutIcon} alt="Salir" className="header__logout-icon" />
            </button>
          ) : (
            location.pathname === '/' && (
              <button className="header__button" onClick={() => { onOpenPopup(); closeMenu(); }}>
                Iniciar sesión
              </button>
            )
          )}
        </nav>
      </div>
      <hr className="line" />
    </header>
  );
}

export default Header;