import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AdminPanel from './pages/AdmPanel';
import CollectionPage from './pages/CollectionPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './pages/Header'; // Импортируем Header
import HomeForAdmin from './pages/HomeForAdmin';
import AddCollection from './pages/AddCollection';
import News from './pages/News';
// import './pages/styles.css';

function App() {
  const location = useLocation(); // Получаем текущий путь страницы

  return (
    <>
      {/* Рендерим Header, если не на главной странице */}
      {location.pathname !== '/' && <Header />} 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<News/>}/>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/homeforadmin" element={<HomeForAdmin />} />
        <Route path="/add-collection" element={<AddCollection />} />
        <Route path="/collection/:collectionId" element={<CollectionPage />} />
      </Routes>
    </>
  );
}

export default App;
