import React, { useState } from 'react';
import { addDoc, collection,db } from '../firebase'; // Импортируем Firestore функции

function AddCollection() {
  const [collectionName, setCollectionName] = useState('');

  // Функция для добавления коллекции
  const handleAddCollection = async () => {
    if (collectionName.trim() === '') return;

    try {
      await addDoc(collection(db, 'collections'), {
        name: collectionName,
      });
      setCollectionName(''); // Очистка поля после добавления
    } catch (error) {
      console.error('Error adding collection: ', error);
    }
  };

  return (
    <div>
      <h2>Add New Collection</h2>
      <input
        type="text"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        placeholder="Enter collection name"
      />
      <button onClick={handleAddCollection}>Add Collection</button>
    </div>
  );
}

export default AddCollection;
