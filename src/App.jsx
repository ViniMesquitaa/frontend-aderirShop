import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import InitialLogin from "./pages/Register";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";

function App() {
  const [cartItems, setCartItems] = useState([]);


  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<Catalog cartItems={cartItems} setCartItems={setCartItems} />} 
        />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/register" element={<InitialLogin />} />
        <Route path="/profile-user" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
      </Routes>
    </>
  );
}

export default App;