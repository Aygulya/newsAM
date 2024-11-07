import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { app } from '../firebase';
import './news.css';

const NewsItem = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div key={post.id} style={{ marginBottom: '20px' }} className='ahali'>
      <h2>{post.name}</h2>
      <h3>{post.title}</h3>
      <p 
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: isExpanded ? 'none' : 2, // Показать только 2 строки по умолчанию
        }}
      >
        {post.content}
      </p>
      <button onClick={toggleContent}>
        {isExpanded ? 'Скрыть' : 'Читать полностью'}
      </button>
      <small>Дата: {new Date(post.date).toLocaleString()}</small>
    </div>
  );
};

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const db = getFirestore(app);
      try {
        const collectionsRef = collection(db, 'collections');
        const collectionsSnapshot = await getDocs(collectionsRef);
        const allPosts = [];

        // Проходим по каждой коллекции в 'collections'
        for (const collectionDoc of collectionsSnapshot.docs) {
          const postsRef = collection(db, `collections/${collectionDoc.id}/posts`);
          const postsQuery = query(postsRef, orderBy('date', 'desc'));
          const postsSnapshot = await getDocs(postsQuery);

          // Добавляем каждый пост в общий массив
          postsSnapshot.forEach((postDoc) => {
            allPosts.push({ id: postDoc.id, ...postDoc.data() });
          });
        }

        // Сортируем все посты по дате в порядке убывания и берем первые 10
        const latestPosts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
        setNews(latestPosts);
      } catch (error) {
        setError('Ошибка при загрузке новостей');
        console.error('Ошибка загрузки постов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='content'>
      <h1>Новости</h1>
      <ul>
        {news.map((post) => (
          <li key={post.id}>
            <NewsItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
