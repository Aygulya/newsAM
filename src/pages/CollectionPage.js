// // // // import React, { useState, useEffect } from 'react';
// // // // import { useParams, Link, useLocation } from 'react-router-dom';
// // // // import { getAuth } from 'firebase/auth';
// // // // import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from '../firebase';
// // // // import 'font-awesome/css/font-awesome.min.css';

// // // // function CollectionPage() {
// // // //   const { collectionId } = useParams();
// // // //   const [posts, setPosts] = useState([]);
// // // //   const [newPostTitle, setNewPostTitle] = useState('');
// // // //   const [newPostContent, setNewPostContent] = useState('');
// // // //   const [isAdmin, setIsAdmin] = useState(false);
// // // //   const [editingPost, setEditingPost] = useState(null);
// // // //   const [isFromAdminPanel, setIsFromAdminPanel] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const location = useLocation();
// // // //   const auth = getAuth();

// // // //   useEffect(() => {
// // // //     const user = auth.currentUser;
// // // //     if (user) {
// // // //       const checkRole = async () => {
// // // //         try {
// // // //           const userDocRef = doc(db, 'users', user.uid);
// // // //           const userDoc = await getDoc(userDocRef);
// // // //           if (userDoc.exists()) {
// // // //             const userData = userDoc.data();
// // // //             setIsAdmin(userData.role === 'admin');
// // // //           } else {
// // // //             setIsAdmin(false);
// // // //           }
// // // //         } catch (error) {
// // // //           console.error('Error checking user role:', error);
// // // //         }
// // // //       };

// // // //       checkRole();
// // // //     }
// // // //   }, [auth]);

// // // //   useEffect(() => {
// // // //     if (location.state && location.state.fromAdminPanel) {
// // // //       setIsFromAdminPanel(true);
// // // //     }
// // // //   }, [location]);

// // // //   useEffect(() => {
// // // //     const fetchPosts = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const postsSnapshot = await getDocs(collection(db, 'collections', collectionId, 'posts'));
// // // //         const postsList = postsSnapshot.docs.map(doc => ({
// // // //           id: doc.id,
// // // //           ...doc.data(),
// // // //         }));
// // // //         setPosts(postsList);
// // // //       } catch (error) {
// // // //         console.error('Error fetching posts:', error);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchPosts();
// // // //   }, [collectionId]);

// // // //   const handleAddPost = async () => {
// // // //     if (newPostTitle.trim() === '' || newPostContent.trim() === '') return;

// // // //     const newPost = {
// // // //       title: newPostTitle,
// // // //       content: newPostContent,
// // // //       date: new Date().toISOString(),
// // // //       translation: {
// // // //         text: '',
// // // //         isVisible: false,
// // // //       },
// // // //       summary: {
// // // //         text: '',
// // // //         isVisible: false,
// // // //       },
// // // //       history: [],
// // // //     };

// // // //     try {
// // // //       await addDoc(collection(db, 'collections', collectionId, 'posts'), newPost);
// // // //       setNewPostTitle('');
// // // //       setNewPostContent('');
// // // //     } catch (error) {
// // // //       console.error('Error adding post: ', error);
// // // //     }
// // // //   };

// // // //   const handleEditPost = async (postId) => {
// // // //     if (!editingPost || !editingPost.title || !editingPost.content) return;
// // // //     if (editingPost.title.trim() === '' || editingPost.content.trim() === '') return;

// // // //     try {
// // // //       const postRef = doc(db, 'collections', collectionId, 'posts', postId);
// // // //       await updateDoc(postRef, {
// // // //         title: editingPost.title,
// // // //         content: editingPost.content,
// // // //       });
// // // //       setEditingPost(null);
// // // //     } catch (error) {
// // // //       console.error('Error updating post: ', error);
// // // //     }
// // // //   };

// // // //   const handleDeletePost = async (postId) => {
// // // //     try {
// // // //       const postRef = doc(db, 'collections', collectionId, 'posts', postId);
// // // //       await deleteDoc(postRef);
// // // //     } catch (error) {
// // // //       console.error('Error deleting post: ', error);
// // // //     }
// // // //   };

// // // //   const handleDeleteCollection = async () => {
// // // //     if (window.confirm('Are you sure you want to delete this collection? This action cannot be undone.')) {
// // // //       try {
// // // //         const collectionRef = doc(db, 'collections', collectionId);
// // // //         await deleteDoc(collectionRef);
// // // //       } catch (error) {
// // // //         console.error('Error deleting collection: ', error);
// // // //       }
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Collection: {collectionId}</h2>
// // // //       {isFromAdminPanel && (
// // // //         <Link to="/admin">Back to Admin Panel</Link>
// // // //       )}
// // // //       {isAdmin && (
// // // //         <div>
// // // //           <input
// // // //             type="text"
// // // //             value={newPostTitle}
// // // //             onChange={(e) => setNewPostTitle(e.target.value)}
// // // //             placeholder="Post Title"
// // // //           />
// // // //           <textarea
// // // //             value={newPostContent}
// // // //             onChange={(e) => setNewPostContent(e.target.value)}
// // // //             placeholder="Post Content"
// // // //           />
// // // //           <button onClick={handleAddPost}>Add Post</button>
// // // //         </div>
// // // //       )}
// // // //       {isAdmin && (
// // // //         <button onClick={handleDeleteCollection}>Delete Collection</button>
// // // //       )}
// // // //       {loading ? (
// // // //         <p>Loading posts...</p>
// // // //       ) : (
// // // //         posts.map((post) => (
// // // //           <div key={post.id} className="post">
// // // //             {editingPost && editingPost.id === post.id ? (
// // // //               <div>
// // // //                 <input
// // // //                   type="text"
// // // //                   value={editingPost.title}
// // // //                   onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
// // // //                   placeholder="Edit Post Title"
// // // //                 />
// // // //                 <textarea
// // // //                   value={editingPost.content}
// // // //                   onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
// // // //                   placeholder="Edit Post Content"
// // // //                 />
// // // //                 <button onClick={() => handleEditPost(post.id)}>Save Changes</button>
// // // //                 <button onClick={() => setEditingPost(null)}>Cancel</button>
// // // //               </div>
// // // //             ) : (
// // // //               <div>
// // // //                 <h3>{post.title}</h3>
// // // //                 <p>{post.content}</p>
// // // //                 <button onClick={() => setEditingPost({ id: post.id, title: post.title, content: post.content })}>Edit</button>
// // // //                 <button onClick={() => handleDeletePost(post.id)}>Delete</button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         ))
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default CollectionPage;
// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, Link, useLocation } from 'react-router-dom';
// // // import { getAuth } from 'firebase/auth';
// // // import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from '../firebase';
// // // import 'font-awesome/css/font-awesome.min.css';

// // // function CollectionPage() {
// // //   const { collectionId } = useParams();
// // //   const [posts, setPosts] = useState([]);
// // //   const [newPostTitle, setNewPostTitle] = useState('');
// // //   const [newPostContent, setNewPostContent] = useState('');
// // //   const [isAdmin, setIsAdmin] = useState(false);
// // //   const [editingPost, setEditingPost] = useState(null);
// // //   const [isFromAdminPanel, setIsFromAdminPanel] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [collectionName, setCollectionName] = useState('');
// // //   const location = useLocation();
// // //   const auth = getAuth();

// // //   useEffect(() => {
// // //     const user = auth.currentUser;
// // //     if (user) {
// // //       const checkRole = async () => {
// // //         try {
// // //           const userDocRef = doc(db, 'users', user.uid);
// // //           const userDoc = await getDoc(userDocRef);
// // //           if (userDoc.exists()) {
// // //             const userData = userDoc.data();
// // //             setIsAdmin(userData.role === 'admin');
// // //           } else {
// // //             setIsAdmin(false);
// // //           }
// // //         } catch (error) {
// // //           console.error('Error checking user role:', error);
// // //         }
// // //       };

// // //       checkRole();
// // //     }
// // //   }, [auth]);

// // //   useEffect(() => {
// // //     if (location.state && location.state.fromAdminPanel) {
// // //       setIsFromAdminPanel(true);
// // //     }
// // //   }, [location]);

// // //   useEffect(() => {
// // //     const fetchCollectionName = async () => {
// // //       try {
// // //         const collectionRef = doc(db, 'collections', collectionId);
// // //         const collectionDoc = await getDoc(collectionRef);
// // //         if (collectionDoc.exists()) {
// // //           setCollectionName(collectionDoc.data().name); // Assuming the collection document has a 'name' field
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching collection name:', error);
// // //       }
// // //     };

// // //     fetchCollectionName();
// // //   }, [collectionId]);

// // //   useEffect(() => {
// // //     const fetchPosts = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const postsSnapshot = await getDocs(collection(db, 'collections', collectionId, 'posts'));
// // //         const postsList = postsSnapshot.docs.map(doc => ({
// // //           id: doc.id,
// // //           ...doc.data(),
// // //         }));
// // //         setPosts(postsList);
// // //       } catch (error) {
// // //         console.error('Error fetching posts:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchPosts();
// // //   }, [collectionId]);

// // //   const handleAddPost = async () => {
// // //     if (newPostTitle.trim() === '' || newPostContent.trim() === '') return;

// // //     const newPost = {
// // //       title: newPostTitle,
// // //       content: newPostContent,
// // //       date: new Date().toISOString(),
// // //       translation: {
// // //         text: '',
// // //         isVisible: false,
// // //       },
// // //       summary: {
// // //         text: '',
// // //         isVisible: false,
// // //       },
// // //       history: [],
// // //     };

// // //     try {
// // //       await addDoc(collection(db, 'collections', collectionId, 'posts'), newPost);
// // //       setNewPostTitle('');
// // //       setNewPostContent('');
// // //     } catch (error) {
// // //       console.error('Error adding post: ', error);
// // //     }
// // //   };

// // //   const handleEditPost = async (postId) => {
// // //     if (!editingPost || !editingPost.title || !editingPost.content) return;
// // //     if (editingPost.title.trim() === '' || editingPost.content.trim() === '') return;

// // //     try {
// // //       const postRef = doc(db, 'collections', collectionId, 'posts', postId);
// // //       await updateDoc(postRef, {
// // //         title: editingPost.title,
// // //         content: editingPost.content,
// // //       });
// // //       setEditingPost(null);
// // //     } catch (error) {
// // //       console.error('Error updating post: ', error);
// // //     }
// // //   };

// // //   const handleDeletePost = async (postId) => {
// // //     try {
// // //       const postRef = doc(db, 'collections', collectionId, 'posts', postId);
// // //       await deleteDoc(postRef);
// // //     } catch (error) {
// // //       console.error('Error deleting post: ', error);
// // //     }
// // //   };

// // //   const handleDeleteCollection = async () => {
// // //     if (window.confirm('Are you sure you want to delete this collection? This action cannot be undone.')) {
// // //       try {
// // //         const collectionRef = doc(db, 'collections', collectionId);
// // //         await deleteDoc(collectionRef);
// // //       } catch (error) {
// // //         console.error('Error deleting collection: ', error);
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className='content'>
// // //       <h2>Collection: {collectionName || collectionId}</h2> {/* Display collection name or ID if not available */}
// // //       {isFromAdminPanel && (
// // //         <Link to="/admin">Back to Admin Panel</Link>
// // //       )}
// // //       {isAdmin && (
// // //         <div>
// // //           <input
// // //             type="text"
// // //             value={newPostTitle}
// // //             onChange={(e) => setNewPostTitle(e.target.value)}
// // //             placeholder="Название новости"
// // //             className='inputLog headerButton'

// // //           /><br/>
// // //           <textarea
// // //             value={newPostContent}
// // //             onChange={(e) => setNewPostContent(e.target.value)}
// // //             placeholder="текст новости"
// // //             className='inputLog headerButton'
// // //           /><br/>
// // //           <button onClick={handleAddPost} className=' headerButton'>добавить пост</button>
// // //         </div>
// // //       )}
// // //       {isAdmin && (
// // //         <button onClick={handleDeleteCollection}>Delete Collection</button>
// // //       )}
// // //       {loading ? (
// // //         <p>Loading posts...</p>
// // //       ) : (
// // //         posts.map((post) => (
// // //           <div key={post.id} className="post">
// // //             {editingPost && editingPost.id === post.id ? (
// // //               <div>
// // //                 <input
// // //                   type="text"
// // //                   value={editingPost.title}
// // //                   onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
// // //                   placeholder="Edit Post Title"
// // //                 />
// // //                 <textarea
// // //                   value={editingPost.content}
// // //                   onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
// // //                   placeholder="Edit Post Content"
// // //                 />
// // //                 <button onClick={() => handleEditPost(post.id)}>Save Changes</button>
// // //                 <button onClick={() => setEditingPost(null)}>Cancel</button>
// // //               </div>
// // //             ) : (
// // //               <div>
// // //                 <h3>{post.title}</h3>
// // //                 <p>{post.content}</p>
// // //                 <button onClick={() => setEditingPost({ id: post.id, title: post.title, content: post.content })}>Edit</button>
// // //                 <button onClick={() => handleDeletePost(post.id)}>Delete</button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default CollectionPage;
// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link, useLocation } from 'react-router-dom';
// // import { getAuth } from 'firebase/auth';
// // import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from '../firebase';
// // import 'font-awesome/css/font-awesome.min.css';

// // function CollectionPage() {
// //   const { collectionId } = useParams();
// //   const [posts, setPosts] = useState([]);
// //   const [newPostTitle, setNewPostTitle] = useState('');
// //   const [newPostContent, setNewPostContent] = useState('');
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   const [editingPost, setEditingPost] = useState(null);
// //   const [isFromAdminPanel, setIsFromAdminPanel] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [collectionName, setCollectionName] = useState('');
// //   const location = useLocation();
// //   const auth = getAuth();

// //   useEffect(() => {
// //     const user = auth.currentUser;
// //     if (user) {
// //       const checkRole = async () => {
// //         try {
// //           const userDocRef = doc(db, 'users', user.uid);
// //           const userDoc = await getDoc(userDocRef);
// //           if (userDoc.exists()) {
// //             const userData = userDoc.data();
// //             setIsAdmin(userData.role === 'admin');
// //           } else {
// //             setIsAdmin(false);
// //           }
// //         } catch (error) {
// //           console.error('Error checking user role:', error);
// //         }
// //       };

// //       checkRole();
// //     }
// //   }, [auth]);

// //   useEffect(() => {
// //     if (location.state && location.state.fromAdminPanel) {
// //       setIsFromAdminPanel(true);
// //     }
// //   }, [location]);

// //   useEffect(() => {
// //     const fetchCollectionName = async () => {
// //       try {
// //         const collectionRef = doc(db, 'collections', collectionId);
// //         const collectionDoc = await getDoc(collectionRef);
// //         if (collectionDoc.exists()) {
// //           setCollectionName(collectionDoc.data().name); // Assuming the collection document has a 'name' field
// //         }
// //       } catch (error) {
// //         console.error('Error fetching collection name:', error);
// //       }
// //     };

// //     fetchCollectionName();
// //   }, [collectionId]);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       setLoading(true);
// //       try {
// //         const postsSnapshot = await getDocs(collection(db, 'collections', collectionId, 'posts'));
// //         const postsList = postsSnapshot.docs.map(doc => ({
// //           id: doc.id,
// //           ...doc.data(),
// //         }));
// //         setPosts(postsList);
// //       } catch (error) {
// //         console.error('Error fetching posts:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //   }, [collectionId]);

// //   const handleAddPost = async () => {
// //     if (newPostTitle.trim() === '' || newPostContent.trim() === '') return;

// //     const newPost = {
// //       title: newPostTitle,
// //       content: newPostContent,
// //       date: new Date().toISOString(),
// //       translation: {
// //         text: '',
// //         isVisible: false,
// //       },
// //       summary: {
// //         text: '',
// //         isVisible: false,
// //       },
// //       history: [],
// //     };

// //     try {
// //       await addDoc(collection(db, 'collections', collectionId, 'posts'), newPost);
// //       setNewPostTitle('');
// //       setNewPostContent('');
// //     } catch (error) {
// //       console.error('Error adding post: ', error);
// //     }
// //   };

// //   const handleEditPost = async (postId) => {
// //     if (!editingPost || !editingPost.title || !editingPost.content) return;
// //     if (editingPost.title.trim() === '' || editingPost.content.trim() === '') return;

// //     try {
// //       const postRef = doc(db, 'collections', collectionId, 'posts', postId);
// //       await updateDoc(postRef, {
// //         title: editingPost.title,
// //         content: editingPost.content,
// //       });
// //       setEditingPost(null);
// //     } catch (error) {
// //       console.error('Error updating post: ', error);
// //     }
// //   };

// //   const handleDeletePost = async (postId) => {
// //     try {
// //       const postRef = doc(db, 'collections', collectionId, 'posts', postId);
// //       await deleteDoc(postRef);
// //     } catch (error) {
// //       console.error('Error deleting post: ', error);
// //     }
// //   };

// //   const handleDeleteCollection = async () => {
// //     if (window.confirm('Are you sure you want to delete this collection? This action cannot be undone.')) {
// //       try {
// //         const collectionRef = doc(db, 'collections', collectionId);
// //         await deleteDoc(collectionRef);
// //       } catch (error) {
// //         console.error('Error deleting collection: ', error);
// //       }
// //     }
// //   };

// //   // Функция для замены переходов строк на <br />
// //   const formatContent = (content) => {
// //     return content.split('\n').map((line, index) => (
// //       <span key={index}>
// //         {line}
// //         <br />
// //       </span>
// //     ));
// //   };

// //   return (
// //     <div className='content'>
// //       <h2>Collection: {collectionName || collectionId}</h2> {/* Display collection name or ID if not available */}
// //       {isFromAdminPanel && (
// //         <Link to="/admin">Back to Admin Panel</Link>
// //       )}
// //       {isAdmin && (
// //         <div>
// //           <input
// //             type="text"
// //             value={newPostTitle}
// //             onChange={(e) => setNewPostTitle(e.target.value)}
// //             placeholder="Название новости"
// //             className='inputLog headerButton'
// //           /><br/>
// //           <textarea
// //             value={newPostContent}
// //             onChange={(e) => setNewPostContent(e.target.value)}
// //             placeholder="текст новости"
// //             className='inputLog headerButton'
// //           /><br/>
// //           <button onClick={handleAddPost} className=' headerButton'>добавить пост</button>
// //         </div>
// //       )}
// //       {isAdmin && (
// //         <button onClick={handleDeleteCollection}>Delete Collection</button>
// //       )}
// //       {loading ? (
// //         <p>Loading posts...</p>
// //       ) : (
// //         posts.map((post) => (
// //           <div key={post.id} className="post">
// //             {editingPost && editingPost.id === post.id ? (
// //               <div>
// //                 <input
// //                   type="text"
// //                   value={editingPost.title}
// //                   onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
// //                   placeholder="Edit Post Title"
// //                 />
// //                 <textarea
// //                   value={editingPost.content}
// //                   onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
// //                   placeholder="Edit Post Content"
// //                 />
// //                 <button onClick={() => handleEditPost(post.id)}>Save Changes</button>
// //                 <button onClick={() => setEditingPost(null)}>Cancel</button>
// //               </div>
// //             ) : (
// //               <div>
// //                 <h3>{post.title}</h3>
// //                 <p>{formatContent(post.content)}</p>
// //                 <button onClick={() => setEditingPost({ id: post.id, title: post.title, content: post.content })}>Edit</button>
// //                 <button onClick={() => handleDeletePost(post.id)}>Delete</button>
// //               </div>
// //             )}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // }

// // export default CollectionPage;
// import React, { useState, useEffect } from 'react'; 
// import { useParams, Link, useLocation } from 'react-router-dom';
// import { getAuth } from 'firebase/auth';
// import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from '../firebase';
// import 'font-awesome/css/font-awesome.min.css';

// function CollectionPage() {
//   const { collectionId } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [newPostTitle, setNewPostTitle] = useState('');
//   const [newPostContent, setNewPostContent] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [editingPost, setEditingPost] = useState(null);
//   const [isFromAdminPanel, setIsFromAdminPanel] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [collectionName, setCollectionName] = useState('');
//   const location = useLocation();
//   const auth = getAuth();

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (user) {
//       const checkRole = async () => {
//         try {
//           const userDocRef = doc(db, 'users', user.uid);
//           const userDoc = await getDoc(userDocRef);
//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             setIsAdmin(userData.role === 'admin');
//           } else {
//             setIsAdmin(false);
//           }
//         } catch (error) {
//           console.error('Error checking user role:', error);
//         }
//       };

//       checkRole();
//     }
//   }, [auth]);

//   useEffect(() => {
//     if (location.state && location.state.fromAdminPanel) {
//       setIsFromAdminPanel(true);
//     }
//   }, [location]);

//   useEffect(() => {
//     const fetchCollectionName = async () => {
//       try {
//         const collectionRef = doc(db, 'collections', collectionId);
//         const collectionDoc = await getDoc(collectionRef);
//         if (collectionDoc.exists()) {
//           setCollectionName(collectionDoc.data().name);
//         }
//       } catch (error) {
//         console.error('Error fetching collection name:', error);
//       }
//     };

//     fetchCollectionName();
//   }, [collectionId]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       try {
//         const postsSnapshot = await getDocs(collection(db, 'collections', collectionId, 'posts'));
//         const postsList = postsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setPosts(postsList);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [collectionId]);

//   const handleAddPost = async () => {
//     if (newPostTitle.trim() === '' || newPostContent.trim() === '') return;

//     const newPost = {
//       title: newPostTitle,
//       content: newPostContent,
//       date: new Date().toISOString(),
//       translation: {
//         text: '',
//         isVisible: false,
//       },
//       summary: {
//         text: '',
//         isVisible: false,
//       },
//       history: [],
//     };

//     try {
//       await addDoc(collection(db, 'collections', collectionId, 'posts'), newPost);
//       setNewPostTitle('');
//       setNewPostContent('');
//     } catch (error) {
//       console.error('Error adding post: ', error);
//     }
//   };

//   const handleEditPost = async (postId) => {
//     if (!editingPost || !editingPost.title || !editingPost.content) return;
//     if (editingPost.title.trim() === '' || editingPost.content.trim() === '') return;

//     try {
//       const postRef = doc(db, 'collections', collectionId, 'posts', postId);
//       await updateDoc(postRef, {
//         title: editingPost.title,
//         content: editingPost.content,
//       });
//       setEditingPost(null);
//     } catch (error) {
//       console.error('Error updating post: ', error);
//     }
//   };

//   const handleDeletePost = async (postId) => {
//     try {
//       const postRef = doc(db, 'collections', collectionId, 'posts', postId);
//       await deleteDoc(postRef);
//     } catch (error) {
//       console.error('Error deleting post: ', error);
//     }
//   };

//   const handleDeleteCollection = async () => {
//     if (window.confirm('Are you sure you want to delete this collection? This action cannot be undone.')) {
//       try {
//         const collectionRef = doc(db, 'collections', collectionId);
//         await deleteDoc(collectionRef);
//       } catch (error) {
//         console.error('Error deleting collection: ', error);
//       }
//     }
//   };

//   return (
//     <div className='content'>
//       <h2>Collection: {collectionName || collectionId}</h2>
//       {isFromAdminPanel && (
//         <Link to="/admin">Back to Admin Panel</Link>
//       )}
//       {isAdmin && (
//         <div>
//           <input
//             type="text"
//             value={newPostTitle}
//             onChange={(e) => setNewPostTitle(e.target.value)}
//             placeholder="Название новости"
//             className='inputLog headerButton'
//           /><br/>
//           <textarea
//             value={newPostContent}
//             onChange={(e) => setNewPostContent(e.target.value)}
//             placeholder="текст новости"
//             className='inputLog headerButton'
//           /><br/>
//           <button onClick={handleAddPost} className=' headerButton'>добавить пост</button>
//         </div>
//       )}
//       {isAdmin && (
//         <button onClick={handleDeleteCollection}>Delete Collection</button>
//       )}
//       {loading ? (
//         <p>Loading posts...</p>
//       ) : (
//         posts.map((post) => (
//           <div key={post.id} className="post">
//             {isAdmin && editingPost && editingPost.id === post.id ? (
//               <div>
//                 <input
//                   type="text"
//                   value={editingPost.title}
//                   onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
//                   placeholder="Edit Post Title"
//                 />
//                 <textarea
//                   value={editingPost.content}
//                   onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
//                   placeholder="Edit Post Content"
//                 />
//                 <button onClick={() => handleEditPost(post.id)}>Save Changes</button>
//                 <button onClick={() => setEditingPost(null)}>Cancel</button>
//               </div>
//             ) : (
//               <div>
//                 <h3>{post.title}</h3>
//                 <p>{post.content}</p>
//                 {isAdmin && (
//                   <div>
//                     <button onClick={() => setEditingPost({ id: post.id, title: post.title, content: post.content })}>Edit</button>
//                     <button onClick={() => handleDeletePost(post.id)}>Delete</button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default CollectionPage;
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from '../firebase';
import 'font-awesome/css/font-awesome.min.css';

function CollectionPage() {
  const { collectionId } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isFromAdminPanel, setIsFromAdminPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const checkRole = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAdmin(userData.role === 'admin');
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error checking user role:', error);
        }
      };

      checkRole();
    }
  }, [auth]);

  useEffect(() => {
    if (location.state && location.state.fromAdminPanel) {
      setIsFromAdminPanel(true);
    }
  }, [location]);

  useEffect(() => {
    const fetchCollectionName = async () => {
      try {
        const collectionRef = doc(db, 'collections', collectionId);
        const collectionDoc = await getDoc(collectionRef);
        if (collectionDoc.exists()) {
          setCollectionName(collectionDoc.data().name);
        }
      } catch (error) {
        console.error('Error fetching collection name:', error);
      }
    };

    fetchCollectionName();
  }, [collectionId]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsSnapshot = await getDocs(collection(db, 'collections', collectionId, 'posts'));
        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [collectionId]);

  const handleAddPost = async () => {
    if (newPostTitle.trim() === '' || newPostContent.trim() === '') return;

    const newPost = {
      title: newPostTitle,
      content: newPostContent,
      date: new Date().toISOString(),
      translation: {
        text: '',
        isVisible: false,
      },
      summary: {
        text: '',
        isVisible: false,
      },
      history: [],
    };

    try {
      await addDoc(collection(db, 'collections', collectionId, 'posts'), newPost);
      setNewPostTitle('');
      setNewPostContent('');
    } catch (error) {
      console.error('Error adding post: ', error);
    }
  };

  const handleEditPost = async (postId) => {
    if (!editingPost || !editingPost.title || !editingPost.content) return;
    if (editingPost.title.trim() === '' || editingPost.content.trim() === '') return;

    try {
      const postRef = doc(db, 'collections', collectionId, 'posts', postId);
      await updateDoc(postRef, {
        title: editingPost.title,
        content: editingPost.content,
      });
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post: ', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const postRef = doc(db, 'collections', collectionId, 'posts', postId);
      await deleteDoc(postRef);
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  };

  const handleDeleteCollection = async () => {
    if (window.confirm('Are you sure you want to delete this collection? This action cannot be undone.')) {
      try {
        const collectionRef = doc(db, 'collections', collectionId);
        await deleteDoc(collectionRef);
      } catch (error) {
        console.error('Error deleting collection: ', error);
      }
    }
  };

  return (
    <div className='content'>
      <h2>Collection: {collectionName || collectionId}</h2>
      {isFromAdminPanel && (
        <Link to="/admin">Back to Admin Panel</Link>
      )}
      {isAdmin && (
        <div>
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="Название новости"
            className='inputLog headerButton'
          /><br/>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="текст новости"
            className='inputLog headerButton'
          /><br/>
          <button onClick={handleAddPost} className=' headerButton'>добавить пост</button>
        </div>
      )}
      {isAdmin && (
        <button onClick={handleDeleteCollection}>Delete Collection</button>
      )}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            {isAdmin && editingPost && editingPost.id === post.id ? (
              <div>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="Edit Post Title"
                />
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  placeholder="Edit Post Content"
                />
                <button onClick={() => handleEditPost(post.id)}>Save Changes</button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{post.title}</h3>
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}  // Отображение HTML
                />
                {isAdmin && (
                  <div>
                    <button onClick={() => setEditingPost({ id: post.id, title: post.title, content: post.content })}>Edit</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CollectionPage;
