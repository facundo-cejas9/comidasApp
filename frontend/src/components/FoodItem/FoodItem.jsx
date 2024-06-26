import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

export const FoodItem = ({ name, price, description, image, id, stars }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-img"
          src={`${url}/images/` + image}
          alt={name}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
            />
            <p>{cartItems[id]}</p>

            <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
        </div>

        <div className="rating">
          <img className="star" src={assets.star} />
          <span>{stars}</span>
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price"> ${price} </p>
      </div>
    </div>
  );
};
