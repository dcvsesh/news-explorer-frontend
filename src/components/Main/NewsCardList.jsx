import { useState } from 'react';
import CardList from './CardList';

function NewsCardList({ articles, keyword, isLoggedIn, onSaveClick, savedArticles }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, articles.length));
  };

  return (
    <div className="news-card">
    <h2 className="news-card-list-title">Resultados de búsqueda: {keyword}</h2>
    <div className="news-card-list">
      <div className="news-card-list__grid">
        {articles.slice(0, visibleCount).map((article, index) => (
          <CardList
            key={`${article.publishedAt}-${index}`}
            article={article}
            keyword={keyword}
            isLoggedIn={isLoggedIn}
            onSaveClick={onSaveClick}
            isSaved={savedArticles.some((a) => a.url === article.url)}
          />
        ))}
      </div>

      {visibleCount < articles.length && (
        <button 
          onClick={handleShowMore} 
          className="news-card-list__show-more"
          aria-label="Ver más artículos"
        >
         Ver más
        </button>
      )}
      </div>
    </div>
  );
}

export default NewsCardList;