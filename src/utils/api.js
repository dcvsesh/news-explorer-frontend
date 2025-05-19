const API_KEY = '03a2cc522041416091b1652d8ed4a723';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchArticles = async (keyword) => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  const params = new URLSearchParams({
    q: keyword,
    from: formatDate(weekAgo),
    to: formatDate(today),
    pageSize: 100,
    apiKey: API_KEY,
    language: 'es'
  });

  try {
    const response = await fetch(`${BASE_URL}/everything?${params}`);
    if (!response.ok) throw new Error('Error en la respuesta de la API');
    
    const data = await response.json();
    if (data.status === 'error') throw new Error(data.message);
    
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const saveArticle = (article) => {
  // Aquí iría la lógica para guardar en tu propia API
  // Ejemplo:
  return fetch('https://tu-api.com/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(article)
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Failed to save article');
    }
    return res.json();
  })
  .catch((err) => {
    console.error('Error saving article:', err);
    throw err;
  });
};

export const deleteArticle = (articleId) => {
  // Aquí iría la lógica para eliminar de tu propia API
  return fetch(`https://tu-api.com/articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Failed to delete article');
    }
    return res.json();
  })
  .catch((err) => {
    console.error('Error deleting article:', err);
    throw err;
  });
};