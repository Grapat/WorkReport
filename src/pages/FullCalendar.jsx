import React from 'react';

// 1. Import the CSS file
import '../css/Calendar.css';

/*
  NOTE: To fix the compilation error, this component has been temporarily
  simplified to not use the 'FullCalendar' library.

  To enable the full-featured calendar, please run this command in your terminal:
  npm install @fullcalendar/react @fullcalendar/daygrid

  Then, you can replace the content of this file with the previous version
  that uses the FullCalendar component.
*/

// A simple static calendar grid for demonstration
function FullCalendar() {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const today = new Date().getDate();

    return (
        <div className="simple-calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="calendar-header">{day}</div>
            ))}
            {days.map(day => (
                <div
                    key={day}
                    className={`calendar-day ${day === today ? 'today' : ''}`}
                >
                    {day}
                </div>
            ))}
        </div>
    );
}

export default FullCalendar;

