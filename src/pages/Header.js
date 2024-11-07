import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, db } from '../firebase'; // Импортируем Firestore функции
import './header.css';
import NewsSearch from './NewsSearch';

function Header() {
  const [collections, setCollections] = useState([]);
  const [showCollections, setShowCollections] = useState(false); // Состояние для управления видимостью коллекций
  const [isMobile, setIsMobile] = useState(false); // Состояние для отслеживания ширины экрана

  // Загружаем коллекции из Firestore
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionsSnapshot = await getDocs(collection(db, 'collections'));
        const collectionsList = collectionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollections(collectionsList);
      } catch (error) {
        console.error('Error fetching collections: ', error);
      }
    };

    fetchCollections();
  }, []);

  // Обработчик изменения размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Изначальный запуск
    handleResize();

    // Отслеживание изменений размера экрана
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функция для переключения видимости коллекций
  const toggleCollections = () => {
    setShowCollections(prevState => !prevState);
  };

  return (
    <div className="header">
      <div className="header-left">
        {/* Кнопка "NEWS" */}
        <p className="news">
          <Link to="./news">NEWS</Link>
        </p>
      </div>

{/* <NewsSearch /> */}
      {/* Кнопка для отображения коллекций, только для мобильных */}
      {isMobile && (
        <button className="toggle-collections-button" onClick={toggleCollections}>
          {showCollections ? 'Hide Collections' : 'Show Collections'}
        </button>
      )}



      {/* Показ коллекций только если showCollections = true и на мобильных устройствах */}
      <div className={`collections-container ${showCollections ? 'show' : ''}`}>
        {collections.map((col) => (
          <Link to={`/collection/${col.id}`} key={col.id} className="collection">
            <button>{col.name}</button>
          </Link>
        ))}
      </div>
      <div className="home-button">
     <Link to="/" className="home-button">
     <i className="fa fa-home"></i> {/* Иконка домика */}
      </Link>
      </div>
    </div>
  );
}

export default Header;
