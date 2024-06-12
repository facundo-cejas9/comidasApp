import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import Cart from "./pages/Cart/Cart";
import PlacerOrder from "./pages/PlaceOrder/PlacerOrder";
import { Footer } from "./components/Footer/Footer";
import { useState } from "react";
import { LoginPopup } from "./components/LoginPopup/LoginPopup";
import VerifyOrder from "./pages/VerfiyOrder/VerifyOrder";
import MyOrders from "./pages/myOrders/MyOrders";
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [showLogin, setShowLogin] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  
  
  return (
    <>
     {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} onSearch={handleSearch} />
        <Routes>
          
          <Route
            path="/"
            element={<HomePage searchTerm={searchTerm} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlacerOrder />} />
          <Route path="/verify" element={ <VerifyOrder />  } />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
