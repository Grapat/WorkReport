import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import '../css/TodoList.css';

// 2. (ใหม่) URL ของ API
const API_URL = 'http://localhost:3001';

function TodoList() {
    // 3. (อัปเดต) เริ่มต้นด้วย Array ว่าง
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 4. (ใหม่) ดึงข้อมูล Todos จากเซิร์ฟเวอร์
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`${API_URL}/api/data`);
                const data = await response.json();
                setTodos(data.todos || []);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodos();
    }, []);

    // 5. (อัปเดต) ฟังก์ชัน handleToggle ให้ส่งข้อมูลกลับไปเซิร์ฟเวอร์
    const handleToggle = async (id) => {
        // สร้าง Array ใหม่ (Optimistic Update)
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );

        // 1. อัปเดต UI ทันที
        setTodos(updatedTodos);

        // 2. ส่ง Array ใหม่ทั้งชุดไปบันทึกที่เซิร์ฟเวอร์
        try {
            await fetch(`${API_URL}/api/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTodos),
            });
        } catch (error) {
            console.error('Failed to update todo status:', error);
            // (ถ้าบันทึกไม่สำเร็จ ควรสั่ง setTods กลับเป็นเวอร์ชันเก่า)
        }
    };

    if (isLoading) {
        return <div>Loading todos...</div>;
    }

    return (
        // 6. (ใหม่) เพิ่ม Wrapper div
        <div className="todolist-wrapper">
            {/* 7. (คงเดิม) Container ที่เลื่อนได้ */}
            <div className="todo-list-container">
                {todos.map(todo => (
                    <div
                        key={todo.id}
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggle(todo.id)}
                            className="todo-checkbox"
                        />
                        <span className="todo-text">
                            {todo.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* 8. (ใหม่) ปุ่มสำหรับลิงก์ไปหน้า WorkLog */}
            <Link to="/full-gallery" className="view-all-link">
                ดูบันทึกการปฏิบัติงานทั้งหมด &rarr;
            </Link>
        </div>
    );
}

export default TodoList;