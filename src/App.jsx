import React from 'react';
import { Routes, Route } from 'react-router-dom'; // 1. Import
import HomePage from './pages/HomePage';
import WorkPlaceDetail from './pages/WorkPlaceDetail'; // 2. Import หน้าใหม่
import WorkPlaceHierarchy from './pages/WorkPlaceHierarchy'; // Import หน้าโครงสร้างองค์กร
import Calendar from './pages/FullCalendar';
import WorkLog from './pages/WorkLog.jsx';

function App() {
  return (
    <Routes> {/* 3. ใช้ Routes หุ้ม */}
      {/* 4. กำหนดเส้นทาง */}
      <Route path="/" element={<HomePage />} />
      <Route path="/workplace" element={<WorkPlaceDetail />} />
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/worklog" element={<WorkLog />} />
      <Route path="/hierarchy" element={<WorkPlaceHierarchy />} />
    </Routes>
  );
}

export default App;