import React, { useContext, useState, useRef, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { assets } from "../../assets/assets";
import axios from "axios";

import "./Navbar.css";



export const Navbar = ({ setShowLogin, onSearch }) => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const { getTotalCartAmount, cartItems, token, setToken, url } =
    useContext(StoreContext);
  const navbarRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        navbarRef.current.classList.add("scrolled");
      } else {
        navbarRef.current.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
        console.error("Failed to fetch user name", error);
      }
    }
  };

  useEffect(() => {
    getUserName();
  }, [token]);

  const totalItems = Object.values(cartItems || {}).reduce(
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

  const handleSearch = () => {
    onSearch(search);
    setSearch("");
    if (search.trim().length <= 1) {
      return;
    } else {
      navigate(`/search/?q=${search}`);
    }
  };
 

  return (
    <div
      ref={navbarRef}
      className={`navbar ${
        location.pathname === "/login" || location.pathname === "/recovery" ? "navbar-start" : ""
      }`}
    >
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo-image"
          className="logo"
        />
        <img className="mobile-logo" src={assets.casa} alt="logo-home" />
      </Link>

      {location.pathname === "/" || location.pathname === "/search/" ? (
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
            onClick={handleSearch}
            className="search-icon"
          />
        </div>
      ) : null}

      <div className={ location.pathname === '/login' || location.pathname === '/recovery'  ? "disable-navbar-right" : "navbar-right" }>
        <div className="navbar-search">
          <Link to="/cart">
            <img src={assets.cart} alt="basket_logo" />
          </Link>
          <div className={getTotalCartAmount(cartItems) === 0 ? "" : "dot"}>
            {getTotalCartAmount(cartItems) >= 1 && <p>{totalItems}</p>}
          </div>
        </div>

        <div className="navbar-profile">
          <div className="profile">
            <img src={assets.profile} alt="Profile icon" />

            {token && (
              <p className="profile-name">
                Hola, <span>{name}</span>!
              </p>
            )}
          </div>

          <ul className="nav-profile-dropdown">
            <div className="profile-dropdown">
              {!token ? (
                <li className="login-dropdown">
                  <img src={assets.login} />
                  <span
                    className="span-login"
                    onClick={() => navigate('/login')}
                  >
                    Iniciar Sesión
                  </span>
                </li>
              ) : (
                <p>
                  Hola, <span>{name}!</span>
                </p>
              )}
            </div>
            <hr className="hr-dropdown" />

            {token ? (
              <>
                <li onClick={handleOrder}>
                  <img src={assets.parcel_icon} alt="bag icon" />
                  <p>Mis pedidos</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout} alt="bag icon" />
                  <p>Logout</p>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
