import React from 'react';
import AdmPanel from './AdmPanel';
function HomeForAdmin() {
  return (
    <div className='content'>
      <h1>Админ Панель</h1>
      <p>Здесь отображаются новости и другие функции для администратора.</p>
     <AdmPanel/>
    </div>
  );
}

export default HomeForAdmin;
