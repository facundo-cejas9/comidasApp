import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Inicio");

  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const totalItems = Object.values(cartItems).reduce((total, quantity) => total + quantity, null);
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
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="basket_logo" />
          </Link>
          
         <div className={ getTotalCartAmount(cartItems) ? "dot" : "" }><p>{ totalItems }</p></div>
           
        </div>
        <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
      </div>
    </div>
  );
};

export default Navbar;
