import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function NewsSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Загружаем все посты
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, 'posts'));
        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllPosts(postsList);
        console.log("All posts loaded:", postsList); // Отладка: проверяем загруженные посты
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
      }
    };

    fetchAllPosts();
  }, []);

  // Функция для поиска
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    // Разбиваем поисковый запрос на отдельные слова
    const searchWords = searchTerm.toLowerCase().split(/\s+/);
    console.log("Search words:", searchWords); // Отладка: проверяем слова из поискового запроса

    // Фильтруем посты, если хотя бы одно слово совпадает с заголовком или содержимым
    const filteredPosts = allPosts.filter(post => {
      const title = post.title ? post.title.toLowerCase() : '';
      const content = post.content ? post.content.toLowerCase() : '';
      
      // Проверяем, есть ли хотя бы одно совпадающее слово в title или content
      const isMatch = searchWords.some(word => title.includes(word) || content.includes(word));
      console.log(`Checking post (Title: ${title}): Match found: ${isMatch}`); // Отладка: проверяем совпадение

      return isMatch;
    });

    setSearchResults(filteredPosts);
    console.log("Filtered results:", filteredPosts); // Отладка: проверяем отфильтрованные результаты
  };

  // Обработчик для запуска поиска по нажатию Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Поиск по постам..."
      />
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map(post => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}

export default NewsSearch;
