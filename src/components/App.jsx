import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import SavedNews from '../components/SavedNews/SavedNews';
import Footer from '../components/Footer/Footer';
import Preloader from '../components/Preloader/Preloader';
import Popup from '../components/Main/Popup/Popup';
import Login from '../components/Main/Popup/LogIn';
import Subscribe from '../components/Main/Popup/Subscribe'; // Asegúrate de tener este componente
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [popupContent, setPopupContent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Nuevo estado

  const openLoginPopup = () => {
    setIsPopupOpen(true); // Actualiza el estado al abrir
    setPopupContent(
      <Popup onClose={closePopup} title="Iniciar sesión">
        <Login handleLogin={handleLogin} onSwitchToSubscribe={openSubscribePopup} />
      </Popup>
    );
  };

  const openSubscribePopup = () => {
    setPopupContent(
      <Popup onClose={closePopup} title="Inscribirse">
        <Subscribe onSwitchToLogin={openLoginPopup} />
      </Popup>
    );
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Actualiza el estado al cerrar
    setPopupContent(null);
  };

  // Cierra el popup con la tecla Escape
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    if (popupContent) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [popupContent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (email, password) => {
    console.log('Login con:', email, password);
    // Simula login exitoso
    setIsLoggedIn(true);
    closePopup(); // opcional: cerrar popup al iniciar sesión
  };

  if (isLoading) return <Preloader />;

  return (
    <div className="page">
      <BrowserRouter>
      <Header 
          onOpenPopup={openLoginPopup} 
          isPopupOpen={isPopupOpen} // Pasa el estado al Header
        />
        <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        <Footer />
        {popupContent}
      </BrowserRouter>
    </div>
  );
}

export default App;