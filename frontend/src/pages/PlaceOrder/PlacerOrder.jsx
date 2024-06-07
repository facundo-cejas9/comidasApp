import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./PlacerOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlacerOrder = () => {
  const { cartItems, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <form className="placeorder">
      <div className="place-order-left">
        <p className="title">Información de entrega</p>
        <div className="multifields">
          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="Apellido" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Direccion" />
        <div className="multifields">
          <input type="text" placeholder="Codigo postal" />
          <input type="number" placeholder="Teléfono" />
        </div>
      </div>
      <div className="place-order-right">
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
      </div>
    </form>
  );
};

export default PlacerOrder;
