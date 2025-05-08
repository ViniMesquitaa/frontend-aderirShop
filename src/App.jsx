import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import InitialLogin from './pages/InitialLogin';



function App() {
  return (
    <Router>

      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<InitialLogin />} />
      </Routes>

    </Router>
  );
}

export default App;
