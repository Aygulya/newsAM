import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, addDoc, deleteDoc, doc } from '../firebase'; // Импортируем Firestore функции
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './home.css'
import './modal.css'
import CollectionPage from './CollectionPage';

function AdminPanel() {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
  const [selectedCollectionId, setSelectedCollectionId] = useState(null); // Для хранения ID коллекции, которую нужно удалить

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
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, []);

  const handleAddCollection = async () => {
    if (newCollectionName.trim() === '') return;

    try {
      await addDoc(collection(db, 'collections'), {
        name: newCollectionName,
      });
      setNewCollectionName('');
    } catch (error) {
      console.error('Error adding collection: ', error);
    }
  };

  const handleDeleteCollection = async () => {
    if (!selectedCollectionId) return;
    try {
      const collectionRef = doc(db, 'collections', selectedCollectionId);
      await deleteDoc(collectionRef); // Удаление коллекции
      setShowModal(false); // Закрываем модальное окно после удаления
      setSelectedCollectionId(null); // Сброс ID выбранной коллекции
    } catch (error) {
      console.error('Error deleting collection: ', error);
    }
  };

  const openModal = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setShowModal(true); // Открытие модального окна
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCollectionId(null);
  };

  return (
    <div className="content">
      <div className="inputsADM">
        <input
          type="text"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          placeholder="заголовок"
          className="inputLog headerButton"
        />
        <button onClick={handleAddCollection} className="headerButton">добавить новый заголовок</button>
      </div>
      <h2>Заголовки</h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link to={`/collection/${collection.id}`} className="headCollect">
              {collection.name}
            </Link>
            <button
              onClick={() => openModal(collection.id)}
              style={{
                background: 'none', // Без фона
                border: 'none',     // Без рамки
                cursor: 'pointer',  // Курсор-указатель
                color: 'blue',       // Синий цвет
                fontSize: '20px',    // Размер иконки
              }}
              aria-label="Delete"
            >
              <i className="fa fa-trash"></i> {/* Иконка мусорного бака */}
            </button>
          </li>
        ))}
      </ul>

      {/* Модальное окно подтверждения */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Вы уверены, что хотите удалить этот заголовок?</h3>
            <div className="modal-actions">
              <button onClick={handleDeleteCollection} className="confirm-delete">Да</button>
              <button onClick={closeModal} className="cancel-delete">Нет</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminPanel;
