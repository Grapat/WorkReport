import React from 'react';

// --- Component Imports ---
import TodoList from './TodoList';
import Calendar from './Calendar';
import WorkPlaceInfo from './WorkPlaceInfo';
import Gallery from './Gallery';

function HomePage() {
  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans p-4 lg:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Homepage</h1>
        <p className="text-slate-400">Welcome, Jirapat Piluke</p>
      </header>

      {/* Main Grid Layout */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">

        {/* Left Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-slate-800 rounded-lg p-6 flex-grow flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Todo List</h2>
            <TodoList />
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Work Place Info</h2>
            <WorkPlaceInfo />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-800 rounded-lg p-6 flex-grow-[2] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            <Calendar />
          </div>
          <div className="bg-slate-800 rounded-lg p-6 flex-grow-[1] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Gallery</h2>
            <Gallery />
          </div>
        </div>

      </main>
    </div>
  );
}

export default HomePage;

