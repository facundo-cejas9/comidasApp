import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import Cart from "./pages/Cart/Cart";
import PlacerOrder from "./pages/PlaceOrder/PlacerOrder";
import { Footer } from "./components/Footer/Footer";
import { useState } from "react";
import { LoginPopup } from "./components/LoginPopup/LoginPopup";
import VerifyOrder from "./pages/VerfiyOrder/VerifyOrder";
import MyOrders from "./pages/myOrders/MyOrders";
import { ToastContainer} from 'react-toastify';
import SearchPage from "./pages/Search/SearchPage";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {

  const [showLogin, setShowLogin] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const location = useLocation()

  
  
  return (
    <>
     {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} onSearch={handleSearch} />
        <Routes>
          
          <Route
            path="/"
            element={<HomePage  />}
          />
          <Route path='/search' element={ <SearchPage searchTerm={searchTerm} /> } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlacerOrder />} />
          <Route path="/verify" element={ <VerifyOrder />  } />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
      {
        location.pathname === '/' && (
          <Footer />
        )
      }
    </>
  );
}

export default App;
