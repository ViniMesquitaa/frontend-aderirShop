import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InitialLogin from "./pages/InitialLogin";
import UnderConstruction from "./components/UnderConstruction";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialLogin />} />
        <Route path="/construction" element={<UnderConstruction />} />
      </Routes>
    </Router>
  );
}

export default App;
