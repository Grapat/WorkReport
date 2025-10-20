import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';

import TodoList from './TodoList';
import WorkPlaceInfo from './WorkPlaceInfo';
import Calendar from './Calendar';
import Gallery from './Gallery';

// --- Main HomePage Component ---

function HomePage() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Jirapat's internship Dashboard</h1>
      <main className="main-grid">
        <div className="left-column">
          <section className="card todolist-card">
            <h2>Todo List</h2>
            <TodoList />
          </section>
          <section className="card workplace-card">
            <h2>Work Place Info</h2>
            <WorkPlaceInfo />
          </section>
        </div>
        <div className="right-column">
          <section className="card calendar-card">
            <h2>Calendar</h2>
            <Calendar />
          </section>
          <section className="card gallery-card">
            <h2>Gallery</h2>
            <Gallery />
          </section>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

