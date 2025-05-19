import { useState } from 'react';
import bookmarkIcon from '../../../images/bookmark.svg';
import bookmarkHoverIcon from '../../../images/bookmark-hover.svg';
import bookmarkActiveIcon from '../../../images/bookmark-active.svg';

function CardList({ article, keyword, isLoggedIn, onSaveClick, isSaved }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleSaveClick = () => {
    if (isLoggedIn && onSaveClick) {
      onSaveClick(article);
    } else {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 9000);
    }
  };

  const getBookmarkIcon = () => {
    if (isSaved) return bookmarkActiveIcon;
    if (isHovered) return bookmarkHoverIcon;
    return bookmarkIcon;
  };

  return (
    <article className="card">
      {article.urlToImage && (
        <div className="card__image-container">
          <img 
            src={article.urlToImage} 
            alt={article.title} 
            className="card__image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="card__save-wrapper">
            {!isLoggedIn && showLoginMessage && (
              <span className="card__login-message">
               Inicia sesión para guardar artículos
              </span>
            )}
            <button
              className="card__save-icon"
              onClick={handleSaveClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img src={getBookmarkIcon()} alt="Guardar artículo" />
            </button>
          </div>
        </div>
      )}

      <div className="card__content">
        <p className="card__date">{formatDate(article.publishedAt)}</p>
        <h3 className="card__title">{article.title}</h3>
        <p className="card__description">
          {article.description || 'Descripción no disponible'}
        </p>
        <p className="card__source">{article.source?.name || 'Fuente desconocida'}</p>
      </div>
    </article>
  );
}

export default CardList;