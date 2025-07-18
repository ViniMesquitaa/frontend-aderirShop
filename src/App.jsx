import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import InitialLogin from "./pages/Register";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  const [cartItems, setCartItems] = useState([]);


  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<Catalog cartItems={cartItems} setCartItems={setCartItems} />} 
        />
        <Route path="/register" element={<InitialLogin />} />
        <Route path="/profile-user" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;