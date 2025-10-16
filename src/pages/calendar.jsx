import React from 'react';

function Calendar() {
    // A simple static calendar grid for demonstration
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const today = new Date().getDate();

    return (
        <div className="grid grid-cols-7 gap-2 text-center h-full">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="font-bold text-slate-500 text-sm">{day}</div>
            ))}
            {days.map(day => (
                <div
                    key={day}
                    className={`p-2 rounded-full flex items-center justify-center ${day === today ? 'bg-teal-500 text-white' : 'hover:bg-slate-700'}`}
                >
                    {day}
                </div>
            ))}
        </div>
    );
}

export default Calendar;
