import { useState, useEffect } from 'react';
import About from './About/About';
import Search from './SearchForm';
import Preloader from '../Preloader/Preloader';
import NewsCardList from './NewsCardList';
import { fetchArticles } from '../../utils/api';
import notFound from "../../../images/not-found.svg";

function Main({ isLoggedIn }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [savedArticles, setSavedArticles] = useState([]);

  const handleSaveClick = (article) => {
    // Lógica para guardar el artículo
    setSavedArticles((prevSavedArticles) => [...prevSavedArticles, article]);
  };

  const handleSearch = async (searchKeyword) => {
    setKeyword(searchKeyword);
    setLoading(true);
    setError('');
    setHasSearched(true);
    
    try {
      const results = await fetchArticles(searchKeyword);
      if (results.length === 0) {
        setArticles([]); // Asegúrate de que no se muestren artículos antiguos
        setError('no-results'); // usa un identificador para mostrar mensaje visual
      } else {
        setArticles(results);
        setError('');
        localStorage.setItem('lastSearch', JSON.stringify({
          keyword: searchKeyword,
          articles: results,
          date: new Date().toISOString()
        }));
      }
    } catch (err) {
      setError('Lo sentimos, algo ha salido mal durante la solicitud.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('lastSearch');
    if (stored) {
      const { keyword, articles } = JSON.parse(stored);
      setKeyword(keyword);
      setArticles(articles);
      setHasSearched(true);
    }
  }, []);

  return (
    <main>
      <Search onSearch={handleSearch} />
      
      {loading && hasSearched && (
  <div className="searching">
    <Preloader />
    <p className="searching__text">Buscando noticias...</p>
  </div>
)}
      
      {!loading && error === 'no-results' && (
  <div className="no-results-section">
    <img
      src={notFound}
      alt="No se encontró nada"
      className="no-results-image"
    />
    <h2 className="no-results-title">No se encontró nada</h2>
    <p className="no-results-text">
      Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
    </p>
  </div>
)}
      
      {!loading && articles.length > 0 && (
        <>
          <NewsCardList
            articles={articles}
            keyword={keyword}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSaveClick={handleSaveClick} // Ahora la función está definida
          />
        </>
      )}
      
      {hasSearched && !loading && articles.length === 0 && !error && (
        <p className="no-results">No se encontraron resultados para "{keyword}"</p>
      )}
      
      <About />
    </main>
  );
}

export default Main;