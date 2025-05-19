import React, { useState, useEffect } from 'react';

function Search({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [lastSearch, setLastSearch] = useState(''); // Nuevo estado para el último término

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() === '') return;
    onSearch(keyword);
    setLastSearch(keyword); // Guarda el término buscado
    setKeyword(''); // Limpia el input (opcional)
  };

  return (
    <div className="search">
      <h1 className="search__title">¿Qué está pasando en el mundo?</h1>
      <p className="search__text">
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu cuenta personal.
      </p>
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={lastSearch || "Introduce un tema"} // Muestra el último término o el placeholder por defecto
          className="search__input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="search__button" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
}

export default Search;