import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Calendar.css';

// URL ของ API เซิร์ฟเวอร์ (ตัวเดียวกับที่ FullCalendar.jsx ใช้)
// (ใหม่) กำหนดช่วงเวลา (เหมือน FullCalendar)
const INTERNSHIP_START = new Date('2025-05-01');
const INTERNSHIP_END = new Date('2026-03-01');

// ปรับปรุงคอมโพเนนต์ให้ดึงข้อมูล
function Calendar() {
    // State สำหรับเก็บข้อมูลที่ดึงมา
    const [attendance, setAttendance] = useState({});
    const [specialEvents, setSpecialEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- State สำหรับควบคุมเดือนที่แสดงผล ---
    // เริ่มต้นที่เดือนปัจจุบัน
    const [currentDate, setCurrentDate] = useState(new Date());

    // --- (ใหม่) ฟังก์ชันสำหรับเลื่อนเดือน ---
    const handlePrevMonth = () => {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        if (prevMonth < INTERNSHIP_START) return;
        setCurrentDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        if (nextMonth > INTERNSHIP_END) return;
        setCurrentDate(nextMonth);
    };
    // --- สิ้นสุดฟังก์ชันเลื่อนเดือน ---


    // --- (อัปเดต) คำนวณวันโดยอิงจาก State `currentDate` ---
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0 = Jan, 1 = Feb, ...
    const monthName = currentDate.toLocaleString('th-TH', { month: 'short', year: 'numeric' }); // 'short'

    // หาข้อมูลของ "วันนี้" (สำหรับไฮไลท์)
    const today = new Date();
    const todayDateNum = (today.getFullYear() === year && today.getMonth() === month) ? today.getDate() : 0;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    // --- สิ้นสุดการคำนวณวัน ---

    // ดึงข้อมูลจากเซิร์ฟเวอร์ (เหมือนเดิม)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/data`);
                const data = await response.json();
                setAttendance(data.attendance || {});
                setSpecialEvents(data.specialEvents || []);
            } catch (error) {
                console.error("Failed to fetch data for mini-calendar:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div className="simple-calendar-grid">Loading...</div>;
    }

    return (
        // (ใหม่) ห่อทั้งหมดด้วย div เพื่อให้ปุ่มอยู่ถูกที่
        <div className="mini-calendar-wrapper">
            <div className="mini-calendar-nav">
                <button onClick={handlePrevMonth} className="mini-nav-button">&lt;</button>
                <h3 className="mini-current-month">{monthName}</h3>
                <button onClick={handleNextMonth} className="mini-nav-button">&gt;</button>
            </div>
            <Link to="/Calendar" className="card-link">
                <div className="simple-calendar-grid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="calendar-header">{day}</div>
                    ))}

                    {blanks.map((_, index) => <div key={`blank-${index}`} className="calendar-day blank"></div>)}

                    {/* --- อัปเดตการแสดงผลวัน (เหมือนเดิม) --- */}
                    {days.map(day => {
                        const dayString = String(day).padStart(2, '0');
                        const monthString = String(month + 1).padStart(2, '0');
                        const dateString = `${year}-${monthString}-${dayString}`;
                        const event = specialEvents.find(e => e.date === dateString);
                        const status = attendance[dateString];

                        let dayClasses = "calendar-day";
                        if (day === todayDateNum) { // เช็คกับ todayDateNum ที่คำนวณใหม่
                            dayClasses += " today";
                        }
                        if (status === 'present') {
                            dayClasses += " status-present-bg";
                        } else if (status === 'absent') {
                            dayClasses += " status-absent-bg";
                        }

                        return (
                            <div key={day} className={dayClasses}>
                                <span className="day-number">{day}</span>
                                {event && (
                                    <div className="event-tag">{event.title}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Link>
        </div>
    );
}

export default Calendar;