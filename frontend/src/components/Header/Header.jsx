import "./Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Ordena tu comida favorita aquí</h2>
        <p>Elige entre una gran variedad de diversas comidas</p>
        <a href="#explore-menu">
          <button>Ver Menú</button>
        </a>
      </div>
    </div>
  );
};
