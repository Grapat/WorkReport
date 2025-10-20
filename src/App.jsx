import React from 'react';
import { Routes, Route } from 'react-router-dom'; // 1. Import
import HomePage from './pages/HomePage';
import WorkPlaceDetail from './pages/WorkPlaceDetail'; // 2. Import หน้าใหม่
import Calendar from './pages/FullCalendar';

function App() {
  return (
    <Routes> {/* 3. ใช้ Routes หุ้ม */}
      {/* 4. กำหนดเส้นทาง */}
      <Route path="/" element={<HomePage />} />
      <Route path="/workplace" element={<WorkPlaceDetail />} />
      <Route path="/Calendar" element={<Calendar />} />
    </Routes>
  );
}

export default App;