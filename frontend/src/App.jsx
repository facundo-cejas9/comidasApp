import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import Cart from "./pages/Cart/Cart";
import PlacerOrder from "./pages/PlaceOrder/PlacerOrder";
import { Footer } from "./components/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import SearchPage from "./pages/Search/SearchPage";
import ErrorPage from "./pages/Error/ErrorPage";
import { LoginPage } from "./pages/Login/LoginPage";
import { RecoveryPage } from "./pages/recovery/RecoveryPage";
import { StoreContext } from "./context/StoreContext";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { recoveryEmail, setRecoveryEmail, passwordToken, setPasswordToken } = useContext(StoreContext);
  const location = useLocation();

  useEffect(() => {
    const storedEmail = localStorage.getItem("recoveryEmail");
    if (storedEmail) {
      setRecoveryEmail(storedEmail);
    }
    
    const storedPasswordToken = localStorage.getItem('passwordResetToken');
    if (storedPasswordToken) {
      setPasswordToken(storedPasswordToken);
    }
  }, [setRecoveryEmail, setPasswordToken]);

  return (
    <>
      <div className="app">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/login" element={<LoginPage setShowLogin={setShowLogin} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage searchTerm={searchTerm} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlacerOrder />} />
          <Route path="/recoverypassword/:id/:token" element={<ResetPassword />} />
          {recoveryEmail && <Route path="/recovery" element={<RecoveryPage />} />}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      {location.pathname === "/" && <Footer />}
    </>
  );
}

export default App;
