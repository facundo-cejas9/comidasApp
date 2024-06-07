import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

import "./Cart.css";

import IconDelete from "../../assets/borrar.png";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Comida</p>
          <p>Precio</p>
          <p>Cantidad</p>
          <p>Total</p>
          <p>Quitar</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id]) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <img
                    onClick={() => removeFromCart(item._id)}
                    src={IconDelete}
                  />
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount(cartItems)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Costo delivery</p>
              <p> ${getTotalCartAmount(cartItems) === 0 ? 0 : 1000} </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total:</b>
              <b>
                {" "}
                $
                {getTotalCartAmount(cartItems) === 0
                  ? 0
                  : getTotalCartAmount(cartItems) + 1000}{" "}
              </b>
            </div>
          </div>

          <button onClick={() => navigate("/order")}>Pagar</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Si tienes un cupón de descuento, ingresalo</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Tu cupón" />
              <button>Aplicar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
