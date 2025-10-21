import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/FullCalendar.css';

// --- (คงเดิม) ---
const INTERNSHIP_START = new Date('2025-06-01');
const INTERNSHIP_END = new Date('2026-03-01');
const API_URL = 'http://localhost:3001';

function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(INTERNSHIP_START);
    const [attendance, setAttendance] = useState({});
    const [specialEvents, setSpecialEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- (ใหม่) State สำหรับควบคุมฟอร์ม ---
    const [showEventForm, setShowEventForm] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');

    // 1. ดึงข้อมูลจากเซิร์ฟเวอร์ (เหมือนเดิม)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/data`);
                const data = await response.json();
                setAttendance(data.attendance || {});
                setSpecialEvents(data.specialEvents || []);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // ... (ฟังก์ชัน handlePrevMonth และ handleNextMonth เหมือนเดิม) ...
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

    // 2. ฟังก์ชัน "สลับ" สถานะการเช็คชื่อ (เหมือนเดิม)
    const handleToggleAttendance = async (day) => {
        // ... (โค้ดข้างในเหมือนเดิมทุกประการ) ...
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const currentStatus = attendance[dateString];
        let nextStatus;
        if (currentStatus === 'present') {
            nextStatus = 'absent';
        } else if (currentStatus === 'absent') {
            nextStatus = 'present';
        } else {
            nextStatus = 'present';
        }
        const newAttendance = { ...attendance, [dateString]: nextStatus };
        setAttendance(newAttendance);
        try {
            await fetch(`${API_URL}/api/attendance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAttendance),
            });
            console.log('Data saved to server!');
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    };

    /**
     * (--- อัปเดต ---)
     * ฟังก์ชันนี้จะ "เปิด" ฟอร์ม Modal
     */
    const handleShowEventForm = () => {
        // ตั้งค่าวันที่เริ่มต้นในฟอร์มเป็นวันที่กำลังดูอยู่ หรือวันปัจจุบัน
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        // ใช้ "วันนี้" (day 1) ของเดือนที่กำลังดูอยู่เป็นค่าเริ่มต้น
        const day = '01';

        setNewEventDate(`${year}-${month}-${day}`);
        setNewEventTitle(''); // เคลียร์ title เก่า
        setShowEventForm(true); // เปิด Modal
    };

    /**
     * (--- ใหม่ ---)
     * ฟังก์ชันสำหรับ "ปิด" ฟอร์ม Modal
     */
    const handleFormCancel = () => {
        setShowEventForm(false);
    };

    /**
     * (--- ใหม่ ---)
     * ฟังก์ชันสำหรับ "Submit" ฟอร์ม (ย้าย logic การ fetch มาไว้ที่นี่)
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault(); // ป้องกันหน้าเว็บรีโหลด

        if (!newEventTitle || !newEventDate) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        const newEvent = { date: newEventDate, title: newEventTitle };

        try {
            // 1. ส่ง event ใหม่ไปที่เซิร์ฟเวอร์
            const response = await fetch(`${API_URL}/api/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent),
            });

            if (!response.ok) throw new Error('Failed to save event');

            const savedEvent = await response.json();

            // 2. อัปเดต UI (State)
            setSpecialEvents(prevEvents => [...prevEvents, savedEvent]);

            // 3. ปิด Modal
            setShowEventForm(false);

        } catch (error) {
            console.error('Failed to add event:', error);
            alert('Error: ไม่สามารถบันทึก Event ได้');
        }
    };

    // --- (คงเดิม) คำนวณข้อมูลของเดือนปัจจุบัน ---
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('th-TH', { month: 'long', year: 'numeric' });
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    if (isLoading) {
        return <div>Loading calendar data...</div>;
    }

    return (
        <div className="calendar-page-container">
            <div className="calendar-top-bar">
                <Link to="/" className="back-link">
                    &larr; กลับไปหน้าหลัก
                </Link>
                {/* (--- อัปเดต ---) เปลี่ยน onClick ไปเรียกฟังก์ชันเปิดฟอร์ม */}
                <button onClick={handleShowEventForm} className="add-event-button">
                    + เพิ่ม Event
                </button>
            </div>

            {/* (--- คงเดิม) --- */}
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
                {/* (--- คงเดิม) Grid ปฏิทิน --- */}
                <div className="simple-calendar-grid">
                    {['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'].map(day => (
                        <div key={day} className="calendar-header">{day}</div>
                    ))}
                    {blanks.map((_, index) => <div key={`blank-${index}`} className="calendar-day blank"></div>)}
                    {days.map(day => {
                        const dayString = String(day).padStart(2, '0');
                        const monthString = String(month + 1).padStart(2, '0');
                        const dateString = `${year}-${monthString}-${dayString}`;
                        const event = specialEvents.find(e => e.date === dateString);
                        const status = attendance[dateString];
                        let dayClasses = "calendar-day";
                        if (status === 'present') {
                            dayClasses += " status-present-bg";
                        } else if (status === 'absent') {
                            dayClasses += " status-absent-bg";
                        }
                        return (
                            <div key={day} className={dayClasses} onClick={() => handleToggleAttendance(day)}>
                                <span className="day-number">{day}</span>
                                {event && (<div className="event-tag">{event.title}</div>)}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* (--- ใหม่ ---) นี่คือ Modal Form ที่จะแสดงเมื่อ showEventForm เป็น true */}
            {showEventForm && (
                <div className="event-form-modal-overlay">
                    <div className="event-form-modal-content">
                        <h2>เพิ่ม Event ใหม่</h2>

                        {/* ใช้ <form> และ onSubmit */}
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="event-title">ชื่อ Event:</label>
                                <input
                                    type="text"
                                    id="event-title"
                                    value={newEventTitle}
                                    onChange={(e) => setNewEventTitle(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-date">วันที่:</label>
                                <input
                                    type="date"
                                    id="event-date"
                                    value={newEventDate}
                                    onChange={(e) => setNewEventDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="button" onClick={handleFormCancel} className="btn-cancel">
                                    ยกเลิก
                                </button>
                                <button type="submit" className="btn-save">
                                    บันทึก
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default CalendarPage;