import React from 'react';

// Mock data for the todo list is now inside the component
const todos = [
    { id: 1, text: 'Prepare lesson plan for Math P.4', completed: false },
    { id: 2, text: 'Grade student worksheets', completed: false },
    { id: 3, text: 'Submit weekly report', completed: true },
    { id: 4, text: 'Attend faculty meeting at 3 PM', completed: false },
];

function TodoList() {
    return (
        <div className="space-y-3 flex-grow overflow-y-auto pr-2">
            {todos.map(todo => (
                <div key={todo.id} className={`flex items-center p-3 rounded-md ${todo.completed ? 'bg-slate-700 text-slate-500' : 'bg-slate-900'}`}>
                    <input 
                        type="checkbox" 
                        checked={todo.completed}
                        readOnly
                        className="w-5 h-5 mr-3 rounded accent-teal-500"
                    />
                    <span className={todo.completed ? 'line-through' : ''}>
                        {todo.text}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default TodoList;
