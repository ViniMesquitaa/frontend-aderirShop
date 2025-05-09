import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import InitialLogin from './pages/InitialLogin';
import PreHeader from './components/PreHeader';



function App() {
  return (
    <Router>


      <Routes>
        <Route path="/" element={<InitialLogin />} />
      </Routes>

    </Router>
  );
}

export default App;
