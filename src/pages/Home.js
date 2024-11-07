import React, { useState } from 'react';
import Login from './Login'; // Импортируем компонент Login
import Register from './Register'; // Импортируем компонент Register
import './home.css'
function Home() {
  const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между формами

  return (
    <div className='content'>
      <h1>Добро пожаловать в новости</h1>
      
      {/* Кнопки для переключения между Login и Register */}
      <div>
        <button onClick={() => setIsLogin(true)} className='headerButton'>войти</button>
        <button onClick={() => setIsLogin(false)} className='headerButton'>зарегистрироваться</button>
      </div>

      {/* Рендерим форму в зависимости от состояния isLogin */}
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}

export default Home;
