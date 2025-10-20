import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/FullCalendar.css';

// --- กำหนดช่วงเวลาที่สามารถเลื่อนดูได้ ---
const INTERNSHIP_START = new Date('2025-06-01');
const INTERNSHIP_END = new Date('2026-03-01');

function CalendarPage() {
    // State สำหรับเก็บวันที่ปัจจุบันที่แสดงผล, เริ่มต้นที่เดือนแรกของการฝึกงาน
    const [currentDate, setCurrentDate] = useState(INTERNSHIP_START);

    // ฟังก์ชันสำหรับเลื่อนไปเดือนก่อนหน้า (พร้อมตัวป้องกัน)
    const handlePrevMonth = () => {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        if (prevMonth < INTERNSHIP_START) return; // ป้องกันการเลื่อนไปก่อนช่วงเวลาที่กำหนด
        console.log(prevMonth);
        setCurrentDate(prevMonth);
    };

    // ฟังก์ชันสำหรับเลื่อนไปเดือนถัดไป (พร้อมตัวป้องกัน)
    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        if (nextMonth > INTERNSHIP_END) return; // ป้องกันการเลื่อนไปหลังช่วงเวลาที่กำหนด
        console.log(nextMonth);
        setCurrentDate(nextMonth);
    };

    // --- คำนวณข้อมูลของเดือนปัจจุบัน ---
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('th-TH', { month: 'long', year: 'numeric' });
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="calendar-page-container">
            <Link to="/" className="back-link">
                &larr; กลับไปหน้าหลัก
            </Link>
            <header className="calendar-page-header">
                <h1>ปฏิทินการฝึกงาน</h1>
                <p>4 มิถุนายน 2568 - 31 มีนาคม 2569</p>
            </header>
            <div className="calendar-wrapper-simple">
                <div className="calendar-nav">
                    <button onClick={handlePrevMonth} className="nav-button">&lt;</button>
                    <h2 className="current-month">{monthName}</h2>
                    <button onClick={handleNextMonth} className="nav-button">&gt;</button>
                </div>
                <div className="simple-calendar-grid">
                    {['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'].map(day => (
                        <div key={day} className="calendar-header">{day}</div>
                    ))}
                    {blanks.map((_, index) => <div key={`blank-${index}`} className="calendar-day blank"></div>)}
                    {days.map(day => (
                        <div key={day} className="calendar-day">
                            <span className="day-number">{day}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;

