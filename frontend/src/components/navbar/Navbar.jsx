import React, { useContext, useState, useRef } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useEffect } from "react";

export const Navbar = ({ setShowLogin, onSearch }) => {
  const [menu, setMenu] = useState("Inicio");
  const [name, setName] = useState('');
  const [search, setSearch] = useState("");
  const { getTotalCartAmount, cartItems, token, setToken, url } = useContext(StoreContext);
  const navbarRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        navbarRef.current.classList.add('scrolled');
      } else {
        navbarRef.current.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getUserName = async () => {
    if (token) {
      try {
        const response = await axios.get(`${url}/api/user/me`, {
          headers: { token },
        });
        setName(response.data.userName.name);
      } catch (error) {
        throw new Error;
      }
    }
  };

  useEffect(() => {
    getUserName();
  }, [token]);

  const totalItems = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleOrder = () => {
    navigate("/myorders");
  };

  return (
    <div ref={navbarRef} className={`navbar ${location.pathname !== "/" ? "navbar-space-between" : ""}`}>
      <Link to="/">
        <img src={assets.logo} alt="logo-image" className="logo" />
        <img className="mobile-logo" src={assets.casa} alt="logo-home" />
      </Link>
      
      {location.pathname === "/" && (
        <div className="searcher">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
          />
          <img
            src={assets.search_icon}
            alt="search-icon"
            onClick={() => onSearch(search)}
            className="search-icon"
          />
        </div>
      )}
      
      <div className="navbar-right">
        <div className="navbar-search">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket_logo" />
          </Link>
          <div className={getTotalCartAmount(cartItems) === 0 ? "" : "dot"}>
            {getTotalCartAmount(cartItems) >= 1 && <p>{totalItems}</p>}
          </div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
        ) : (
          <div className="navbar-profile">
            <div className="profile">
              <img src={assets.profile_icon} alt="Profile icon" />
              <p>Hola, <span>{name}!</span> </p>
            </div>

            <ul className="nav-profile-dropdown">
              <li onClick={handleOrder}>
                <img src={assets.bag_icon} alt="bag icon" />
                <p>Ordenes</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="bag icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
