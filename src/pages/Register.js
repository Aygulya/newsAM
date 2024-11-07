import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';  // Импортируем Firestore

// SVG для открытого глаза с ресничками
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
    <g>
      <path d="M12 4C7 4 3 7 3 10s4 6 9 6 9-3 9-6-4-6-9-6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
      {/* Реснички сверху, когда глаз открыт */}
      <path d="M7 4L9 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      <path d="M12 1L12 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      <path d="M17 4L15 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
    </g>
  </svg>
);

// SVG для закрытого глаза с ресничками (реснички снизу)
const EyeClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor">
    <g>
      <path d="M12 4C7 4 3 7 3 10s4 6 9 6 9-3 9-6-4-6-9-6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      {/* Реснички снизу, когда глаз закрыт */}
      <path d="M7 16L9 18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      <path d="M12 19L12 17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      <path d="M17 16L15 18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
    </g>
  </svg>
);

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Для подтверждения пароля
  const [role, setRole] = useState('user');  // Роль пользователя (можно выбирать)
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Для показа пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Для показа подтверждения пароля
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Проверка домена почты
    if (!email.endsWith('@eyeconweb.com') && email !== 'aygulenka94@gmail.com') {
      setError('Email must end with @eyeconweb.com or be aygulenka94@gmail.com');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Регистрация пользователя через Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Сохраняем пользователя в Firestore с ролью
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role, // Добавляем роль
      });

      // После успешной регистрации перенаправление на главную страницу
      navigate('/login');
    } catch (error) {
      // Обработка ошибок
      setError(error.message);
    }
  };

  return (
    <div className='content'>
      <h1>РЕГИСТРАЦИЯ</h1>
      <form onSubmit={handleRegister} className='content'>
      <div className='inputs'>
        <div>
          {/* <label>Email:</label> */}
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="inputLog headerButton"
          />
        </div>
        <div>
          {/* <label>Password:</label> */}
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="inputLog headerButton"
            />
        <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)} 
          className="password-toggle-button"
        >
          {showPassword ? <EyeIcon /> : <EyeClosedIcon />} {/* Иконка глаза */}
        </button>
          </div>
        </div>
        <div>

          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              placeholder="Подтвердите пароль"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="inputLog headerButton"
            />
        <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)} 
          className="password-toggle-button"
        >
          {showPassword ? <EyeIcon /> : <EyeClosedIcon />} {/* Иконка глаза */}
        </button>
          </div>
        </div>
        <div>
          {/* <label>Role:</label> */}
          <select value={role} onChange={(e) => setRole(e.target.value)} className="inputLog headerButton">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        </div>
        <button type="submit" className="headerButton">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register;
