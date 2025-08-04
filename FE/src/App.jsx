// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Teachers from './pages/Teachers';
import Positions from './pages/Positions';
import Classes from './pages/Classes'; // New import
import Students from './pages/Students'; // New import
import Data from './pages/Data'; // New import

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/classes" element={<Classes />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/data" element={<Data />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/" element={<Teachers />} /> {/* Default route */}
      </Routes>
    </Layout>
  );
}

export default App;