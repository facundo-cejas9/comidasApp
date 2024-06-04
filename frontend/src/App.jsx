import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import Cart from "./pages/Cart/Cart";
import PlacerOrder from "./pages/PlaceOrder/PlacerOrder";
import { Footer } from "./components/Footer/Footer";
import { useState } from "react";
import { LoginPopup } from "./components/LoginPopup/LoginPopup";

function App() {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
     {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
       
        <Navbar setShowLogin={ setShowLogin } />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlacerOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
