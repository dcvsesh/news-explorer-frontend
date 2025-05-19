import { Link } from 'react-router-dom';
import github from "../../../images/github.svg"
import facebook from "../../../images/fb.svg"

function Footer(){
    return(
    <footer className="footer">
        <div className="footer__copy">
            <p className="footer__copyright">&copy; 2025 Supersite, Powered by News API.</p>
            </div>
            <div className="footer__nav">
  <div className="footer__links">
    <Link to="/" className="footer__link">Inicio</Link>
    <Link to="/saved-news" className="footer__link">Practicum</Link>
  </div>
  <div className="footer__icons">
    <a
      href="https://github.com/dcvsesh"
      target="_blank"
      rel="noopener noreferrer"
      className="footer__icon-link"
    >
      <img src={github} alt="GitHub" className="footer__icon" />
    </a>
    <a
      href="https://www.facebook.com/tripleten.latam/?locale=es_LA"
      target="_blank"
      rel="noopener noreferrer"
      className="footer__icon-link"
    >
      <img src={facebook} alt="Facebook" className="footer__icon" />
    </a>
  </div>
</div>
    </footer>
    );
    }
    export default Footer;