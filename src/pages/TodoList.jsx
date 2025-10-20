import React, { useState } from 'react';
import '../css/TodoList.css';

// Initial list of tasks
const initialTodos = [
    { id: 1, text: 'จัดทำแผนการสอนคณิตศาสตร์ ป.4', completed: false },
    { id: 2, text: 'ตรวจแบบฝึกหัดนักเรียน', completed: false },
    { id: 3, text: 'ส่งรายงานประจำสัปดาห์', completed: true },
    { id: 4, text: 'เข้าร่วมประชุมคณะครู 15:00 น.', completed: false },
];

function TodoList() {
    // Use React's state to manage the list, making it interactive
    const [todos, setTodos] = useState(initialTodos);

    // This function runs when a checkbox is clicked
    const handleToggle = (id) => {
        // Create a new list with the updated 'completed' status for the clicked item
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        // Update the state with the new list
        setTodos(updatedTodos);
    };

    return (
        // Use the class names defined in TodoList.css
        <div className="todo-list-container">
            {todos.map(todo => (
                <div
                    key={todo.id}
                    // Add the 'completed' class if the task is done
                    className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggle(todo.id)} // Allow clicking the checkbox
                        className="todo-checkbox"
                    />
                    <span className="todo-text">
                        {todo.text}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default TodoList;

