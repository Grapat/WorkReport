import React from 'react';
import { Routes, Route } from 'react-router-dom'; // 1. Import
import HomePage from './pages/HomePage';
import WorkPlaceDetail from './pages/WorkPlaceDetail'; // 2. Import หน้าใหม่
import WorkPlaceHierarchy from './pages/WorkPlaceHierarchy'; // Import หน้าโครงสร้างองค์กร
import Calendar from './pages/FullCalendar'; // Import หน้า ปฏิทิน
import FullGallery from './pages/FullGallery.jsx'; // Import หน้า Full Gallery

function App() {
  return (
    <Routes> {/* 3. ใช้ Routes หุ้ม */}
      {/* 4. กำหนดเส้นทาง */}
      <Route path="/" element={<HomePage />} />
      <Route path="/workplace" element={<WorkPlaceDetail />} />
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/hierarchy" element={<WorkPlaceHierarchy />} />
      <Route path="/full-gallery" element={<FullGallery />} />
    </Routes>
  );
}

export default App;