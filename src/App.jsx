import { Routes, Route } from "react-router-dom";

import InitialLogin from "./pages/InitialLogin";
import UnderConstruction from "./components/UnderConstruction";
import Catalog from "./pages/Catalog";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<InitialLogin />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/construction" element={<UnderConstruction />} />
      </Routes>
 
    </>
  );
}

export default App;
