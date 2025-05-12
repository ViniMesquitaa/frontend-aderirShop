import { Routes, Route } from "react-router-dom";
import InitialLogin from "./pages/InitialLogin";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<InitialLogin />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/profile-user" element={<Profile />} />    </Routes>
 
    </>
  );
}

export default App;
