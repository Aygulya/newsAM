// // import { initializeApp } from "firebase/app";
// // import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; 
// // import { getFirestore, doc, getDoc, collection, getDocs, addDoc } from "firebase/firestore"; // Импортируем функции doc и getDoc
// // import { doc, getDoc } from 'firebase/firestore';

// // // Your Firebase configuration
// // const firebaseConfig = {
// //   apiKey: "AIzaSyBVrqwAMahEjWLSiCq9D--Pmq1b6vKxKx0",
// //   authDomain: "for-am-project.firebaseapp.com",
// //   projectId: "for-am-project",
// //   storageBucket: "for-am-project.firebasestorage.app",
// //   messagingSenderId: "881716340086",
// //   appId: "1:881716340086:web:8ba608a52a454b317dc657",
// //   measurementId: "G-5NJJWJ53W6"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app); // Получаем объект auth из Firebase
// // const db = getFirestore(app); // Инициализация Firestore

// // export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, getDoc, collection, getDocs, addDoc }; // Экспортируем функции
// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; 
// import { getFirestore, doc, getDoc, collection, getDocs, addDoc } from "firebase/firestore"; 

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBVrqwAMahEjWLSiCq9D--Pmq1b6vKxKx0",
//   authDomain: "for-am-project.firebaseapp.com",
//   projectId: "for-am-project",
//   storageBucket: "for-am-project.firebasestorage.app",
//   messagingSenderId: "881716340086",
//   appId: "1:881716340086:web:8ba608a52a454b317dc657",
//   measurementId: "G-5NJJWJ53W6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app); // Получаем объект auth из Firebase
// const db = getFirestore(app); // Инициализация Firestore

// export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, getDoc, collection, getDocs, addDoc }; // Экспортируем необходимые функции и объекты
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, getDocs, addDoc, collection, updateDoc, deleteDoc,setDoc , writeBatch } from 'firebase/firestore'; // добавьте deleteDoc
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVrqwAMahEjWLSiCq9D--Pmq1b6vKxKx0",
  authDomain: "for-am-project.firebaseapp.com",
  projectId: "for-am-project",
  storageBucket: "for-am-project.firebasestorage.app",
  messagingSenderId: "881716340086",
  appId: "1:881716340086:web:8ba608a52a454b317dc657",
  measurementId: "G-5NJJWJ53W6"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Получаем auth
const db = getFirestore(app); // Инициализация Firestore

// Экспортируем необходимые объекты и функции
// export {auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, getDoc, collection, getDocs, addDoc  };

export {
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc, // Добавляем updateDoc
  addDoc,
  collection,
  getDocs,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteDoc,
  writeBatch,
  app
};