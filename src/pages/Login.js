import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Импорт настроек firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Состояние для показа пароля
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;
        if (userRole === 'admin') {
          navigate('/homeforadmin');
        } else if (userRole === 'user') {
          navigate('/news');
        }
      } else {
        console.error('User not found in Firestore');
      }
    } catch (error) {
      console.error('Error signing in: ', error.code, error.message);
    }
  };

  return (
    <div className='content'>
      <h1>ВХОД</h1>
      <div className='inputs'>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="inputLog headerButton"
      />
      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'} // Тип поля изменяется в зависимости от состояния
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
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

      <button onClick={handleLogin} className='headerButton'>войти</button>
    </div>
  );
}

export default Login;
