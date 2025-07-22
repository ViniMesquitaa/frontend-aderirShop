import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const Main = () => {
  const location = useLocation();

  const hideHeaderRoutes = ["/"];
  const hideFooterRoutes = ["/profile-user", "/login", "/", "/register", "/order-tracking", "/checkout"];

  const showHeader = !hideHeaderRoutes.includes(location.pathname);
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header cartVisible={false} />}
      <App />
      {showFooter && <Footer />}
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StrictMode>
);

export default Main;
