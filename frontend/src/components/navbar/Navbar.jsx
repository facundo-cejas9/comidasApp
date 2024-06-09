import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export const Navbar = ({ setShowLogin }) => {


  const [menu, setMenu] = useState("Inicio");
  const { getTotalCartAmount, cartItems, token, setToken } = useContext(StoreContext);

  const totalItems = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    null
  );

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setToken("")
    navigate('/')
  }

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo-image" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("Inicio");
          }}
          className={menu === "Inicio" ? "active" : ""}
        >
          Inicio
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("Menu");
          }}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setMenu("Mobile App");
          }}
          className={menu === "Mobile App" ? "active" : ""}
        >
          App
        </a>
        <a
          href="#footer"
          onClick={() => {
            setMenu("Contactanos");
          }}
          className={menu === "Contactanos" ? "active" : ""}
        >
          Contáctanos
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="user-image" />
        <div className="navbar-search">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket_logo" />
          </Link>
          <div className={getTotalCartAmount(cartItems) === 0 ? "" : "dot"}>
            <p>{totalItems}</p>
          </div>
          </div>

         
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile icon" />
              <ul className="nav-profile-dropdown">
                <li>
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
        
        {/* <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button> */}
      </div>
    </div>
  );
};

export default Navbar;
