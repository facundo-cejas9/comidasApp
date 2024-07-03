import React from "react";
import { Link } from "react-router-dom";

export const EmptyCart = ({ srcImg, textInCart }) => {
  return (
    <>
      <div className="empty-cart">
        <img src={srcImg} />
        <p>{ textInCart }</p>
        <Link to="/#explore-menu">
          <button className="btn-empty-cart">Comenzar a comprar</button>
        </Link>
      </div>
    </>
  );
};
