import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './pages/List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List />} />
        {/* <Route path="/focus" element={<Somescreens />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
