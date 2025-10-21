import React, { useState, useEffect } from 'react';
// 1. Import the CSS file
import '../css/Calendar.css';

// URL ของ API เซิร์ฟเวอร์ (ตัวเดียวกับที่ FullCalendar.jsx ใช้)
const API_URL = 'http://localhost:3001';

// ปรับปรุงคอมโพเนนต์ให้ดึงข้อมูล
function Calendar() {
    // State สำหรับเก็บข้อมูลที่ดึงมา
    const [attendance, setAttendance] = useState({});
    const [specialEvents, setSpecialEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- คำนวณวันใน "เดือนปัจจุบัน" ---
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0 = Jan, 1 = Feb, ...
    const todayDateNum = today.getDate(); // วันที่ของวันนี้ (เช่น 21)

    // หาว่าวันแรกของเดือนคือวันอะไร (0 = Sun, 1 = Mon, ...)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // หาว่าเดือนนี้มีกี่วัน
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // สร้าง array สำหรับช่องว่างหน้าปฏิทิน และ array สำหรับวัน
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    // --- สิ้นสุดการคำนวณวัน ---

    // ดึงข้อมูลจากเซิร์ฟเวอร์เมื่อคอมโพเนนต์โหลด
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/data`);
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
    }, []); // `[]` หมายถึงให้ทำงานแค่ครั้งเดียวตอนโหลด

    // (ทางเลือก) แสดงผลว่ากำลังโหลด
    if (isLoading) {
        return <div className="simple-calendar-grid">Loading...</div>;
    }

    return (
        <div className="simple-calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="calendar-header">{day}</div>
            ))}

            {/* แสดงช่องว่าง */}
            {blanks.map((_, index) => <div key={`blank-${index}`} className="calendar-day blank"></div>)}

            {/* --- อัปเดตการแสดงผลวัน --- */}
            {days.map(day => {
                // สร้าง dateString (YYYY-MM-DD)
                const dayString = String(day).padStart(2, '0');
                const monthString = String(month + 1).padStart(2, '0');
                const dateString = `${year}-${monthString}-${dayString}`;

                // ค้นหาข้อมูล
                const event = specialEvents.find(e => e.date === dateString);
                const status = attendance[dateString];

                // สร้าง CSS class แบบไดนามิก
                let dayClasses = "calendar-day";
                if (day === todayDateNum) {
                    dayClasses += " today"; // ไฮไลท์วันปัจจุบัน
                }
                if (status === 'present') {
                    dayClasses += " status-present-bg";
                } else if (status === 'absent') {
                    dayClasses += " status-absent-bg";
                }

                return (
                    <div
                        key={day}
                        className={dayClasses}
                    // --- ไม่ต้องใส่ onClick ที่นี่เพื่อให้ "Read-only" ---
                    >
                        <span className="day-number">{day}</span>
                        {event && (
                            // (ทางเลือก) อาจใช้ event-tag-mini ถ้าอยากให้เล็กกว่า
                            <div className="event-tag">{event.title}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Calendar;