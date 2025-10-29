import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Calendar.css';

// --- (คงเดิม) ---
const INTERNSHIP_START = new Date('2025-05-01');
const INTERNSHIP_END = new Date('2026-03-01');
const API_URL = 'http://localhost:3001';

function CalendarPage() {
    // --- (คงเดิม) State หลัก ---
    const [currentDate, setCurrentDate] = useState(new Date()); // เริ่มที่วันนี้
    const [attendance, setAttendance] = useState({});
    const [specialEvents, setSpecialEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- (อัปเดต) State สำหรับควบคุมฟอร์ม ---
    const [showEventForm, setShowEventForm] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [editingEvent, setEditingEvent] = useState(null); // <-- (ใหม่) เก็บ Event ที่กำลังแก้ไข

    // 1. ดึงข้อมูลจากเซิร์ฟเวอร์ (เหมือนเดิม)
    useEffect(() => {
        const fetchData = async () => { /* ... โค้ด fetch เดิม ... */
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

    // ... (ฟังก์ชัน handlePrevMonth, handleNextMonth, handleToggleAttendance เหมือนเดิม) ...
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
    const handleToggleAttendance = async (day) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const currentStatus = attendance[dateString];
        let nextStatus;
        if (currentStatus === 'present') { nextStatus = 'absent'; }
        else if (currentStatus === 'absent') { nextStatus = 'present'; }
        else { nextStatus = 'present'; }
        const newAttendance = { ...attendance, [dateString]: nextStatus };
        setAttendance(newAttendance);
        try {
            await fetch(`${API_URL}/api/attendance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAttendance),
            });
        } catch (error) { console.error('Failed to save data:', error); }
    };

    /**
     * (--- อัปเดต ---)
     * เปิดฟอร์ม Modal (รับ event ที่จะแก้เป็น optional argument)
     */
    const handleShowEventForm = (eventToEdit = null) => {
        if (eventToEdit) {
            // โหมดแก้ไข: ใช้ข้อมูลจาก event ที่ส่งมา
            setEditingEvent(eventToEdit);
            setNewEventTitle(eventToEdit.title);
            setNewEventDate(eventToEdit.date);
        } else {
            // โหมดเพิ่มใหม่: ตั้งค่าเริ่มต้น
            setEditingEvent(null);
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = '01';
            setNewEventDate(`${year}-${month}-${day}`);
            setNewEventTitle('');
        }
        setShowEventForm(true); // เปิด Modal
    };

    /** (--- คงเดิม) ปิดฟอร์ม Modal */
    const handleFormCancel = () => {
        setShowEventForm(false);
        setEditingEvent(null); // เคลียร์ event ที่กำลังแก้
    };

    /**
     * (--- อัปเดต ---)
     * Submit ฟอร์ม (แยก logic เพิ่มใหม่ / แก้ไข)
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!newEventTitle || !newEventDate) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        const eventData = { date: newEventDate, title: newEventTitle };

        try {
            let savedEvent;
            let response;

            if (editingEvent) {
                // --- โหมดแก้ไข (PUT) ---
                response = await fetch(`${API_URL}/api/events/${editingEvent.date}`, { // ใช้ date เดิมเป็น key
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eventData), // ส่งข้อมูลใหม่ไป
                });
                if (!response.ok) throw new Error('Failed to update event');
                savedEvent = await response.json(); // event ที่อัปเดตแล้ว

                // อัปเดต State: แทนที่ event เก่าด้วย event ใหม่
                setSpecialEvents(prevEvents => prevEvents.map(ev =>
                    ev.date === editingEvent.date ? savedEvent : ev
                ));

            } else {
                // --- โหมดเพิ่มใหม่ (POST) ---
                response = await fetch(`${API_URL}/api/events`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eventData),
                });
                if (!response.ok) throw new Error('Failed to add event');
                savedEvent = await response.json(); // event ที่เพิ่มใหม่

                // อัปเดต State: เพิ่ม event ใหม่เข้าไป
                setSpecialEvents(prevEvents => [...prevEvents, savedEvent]);
            }

            // ปิด Modal
            setShowEventForm(false);
            setEditingEvent(null);

        } catch (error) {
            console.error('Failed to save event:', error);
            alert(`Error: ไม่สามารถบันทึก Event ได้ (${error.message})`);
        }
    };

    /**
     * (--- ใหม่ ---)
     * ฟังก์ชันสำหรับ "ลบ" Event
     */
    const handleDeleteEvent = async () => {
        if (!editingEvent || !window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ Event "${editingEvent.title}"?`)) {
            return; // ถ้าไม่ได้อยู่ในโหมดแก้ไข หรือ กดยกเลิก
        }

        try {
            const response = await fetch(`${API_URL}/api/events/${editingEvent.date}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete event');

            // อัปเดต UI (State): กรอง event ที่ถูกลบออกไป
            setSpecialEvents(prevEvents => prevEvents.filter(ev => ev.date !== editingEvent.date));

            // ปิด Modal
            setShowEventForm(false);
            setEditingEvent(null);

        } catch (error) {
            console.error('Failed to delete event:', error);
            alert(`Error: ไม่สามารถลบ Event ได้ (${error.message})`);
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

    if (isLoading) { return <div>Loading calendar data...</div>; }

    return (
        <div className="calendar-page-container">
            <div className="calendar-top-bar">
                <Link to="/" className="back-link"> &larr; กลับไปหน้าหลัก </Link>
                {/* ปุ่ม Add Event เปิดฟอร์มแบบไม่มีข้อมูลตั้งต้น */}
                <button onClick={() => handleShowEventForm()} className="add-event-button"> + เพิ่ม Event </button>
            </div>

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
                    {['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'].map(day => (<div key={day} className="calendar-header">{day}</div>))}
                    {blanks.map((_, index) => <div key={`blank-${index}`} className="calendar-day blank"></div>)}
                    {days.map(day => {
                        const dayString = String(day).padStart(2, '0');
                        const monthString = String(month + 1).padStart(2, '0');
                        const dateString = `${year}-${monthString}-${dayString}`;
                        const event = specialEvents.find(e => e.date === dateString);
                        const status = attendance[dateString];
                        let dayClasses = "calendar-day";
                        if (status === 'present') { dayClasses += " status-present-bg"; }
                        else if (status === 'absent') { dayClasses += " status-absent-bg"; }
                        return (
                            <div key={day} className={dayClasses} onClick={() => handleToggleAttendance(day)}>
                                <span className="day-number">{day}</span>
                                {event && (
                                    // (--- อัปเดต ---) ทำให้ Event Tag คลิกได้
                                    <div
                                        className="event-tag clickable"
                                        onClick={(e) => {
                                            e.stopPropagation(); // หยุดไม่ให้ event click ลอยไปถึง .calendar-day
                                            handleShowEventForm(event); // เปิดฟอร์มในโหมดแก้ไข
                                        }}
                                    >
                                        {event.title}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* (--- อัปเดต ---) Modal Form */}
            {showEventForm && (
                <div className="event-form-modal-overlay">
                    <div className="event-form-modal-content">
                        {/* เปลี่ยน Title ตามโหมด */}
                        <h2>{editingEvent ? 'แก้ไข Event' : 'เพิ่ม Event ใหม่'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="event-title">ชื่อ Event:</label>
                                <input type="text" id="event-title" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} required autoFocus />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event-date">วันที่:</label>
                                <input type="date" id="event-date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} required />
                            </div>
                            <div className="form-buttons">
                                {/* (--- ใหม่ ---) ปุ่มลบ (แสดงเฉพาะโหมดแก้ไข) */}
                                {editingEvent && (
                                    <button type="button" onClick={handleDeleteEvent} className="btn-delete">
                                        ลบ Event
                                    </button>
                                )}
                                <button type="button" onClick={handleFormCancel} className="btn-cancel"> ยกเลิก </button>
                                <button type="submit" className="btn-save"> บันทึก </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarPage;