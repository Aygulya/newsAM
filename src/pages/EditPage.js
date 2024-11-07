// src/pages/EditPage.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function EditPage() {
  const { pageId } = useParams();
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Загрузка постов для страницы
  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = doc(db, 'news', pageId);
      const postsSnap = await getDoc(postsRef);

      if (postsSnap.exists()) {
        setPosts(postsSnap.data().posts || []);
      } else {
        console.log('No such document!');
      }
    };

    fetchPosts();
  }, [pageId]);

  const handleAddPost = async () => {
    if (!newTitle || !newContent) return;

    try {
      const postRef = doc(db, 'news', pageId, 'posts', newTitle);
      await updateDoc(postRef, {
        title: newTitle,
        content: newContent,
        createdAt: new Date(),
      });

      // Обновление списка постов после добавления
      setPosts((prevPosts) => [
        ...prevPosts,
        { title: newTitle, content: newContent },
      ]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div>
      <h1>Edit Page</h1>
      <div>
        <h2>Posts</h2>
        {posts.map((post, index) => (
          <div key={index}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      <div>
        <h2>Add New Post</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Post Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        ></textarea>
        <button onClick={handleAddPost}>Add Post</button>
      </div>
    </div>
  );
}

export default EditPage;
