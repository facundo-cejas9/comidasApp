import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlacerOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlacerOrder = () => {
  const {
    cartItems,
    getTotalCartAmount,
    token,
    food_list,
    url,
    getTotalCartAmountWithDiscount,
    haveDiscount,
    setHaveDiscount,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    address: "",
    codigo_postal: "",
    telefono: "",
  });
  const [totalAmount, setTotalAmount] = useState(0); // Estado para almacenar el total

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let totalAmount = getTotalCartAmount(cartItems);

    if (haveDiscount) {
      totalAmount = getTotalCartAmountWithDiscount(cartItems, haveDiscount); 
      setHaveDiscount(true);
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount,
      haveDiscount: haveDiscount 
    };
  
    let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
    });
    if (response.data.success) {
        const { sesion_url } = response.data;
        window.location.replace(sesion_url);
    } else {
        alert(response.data.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (getTotalCartAmount(cartItems) === 0) {
      navigate("/");
    }
    setTotalAmount(getTotalCartAmount(cartItems)); // Inicialmente establecemos el total sin descuento
  }, [token, cartItems]);

  return (
    <form className="placeorder" onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className="title">Información de entrega</p>
        <div className="multifields">
          <input
            required
            name="nombre"
            onChange={handleChange}
            value={data.nombre}
            type="text"
            placeholder="Nombre"
          />
          <input
            required
            name="apellido"
            onChange={handleChange}
            value={data.apellido}
            type="text"
            placeholder="Apellido"
          />
        </div>
        <input
          required
          name="email"
          onChange={handleChange}
          value={data.email}
          type="email"
          placeholder="Email"
        />
        <input
          required
          name="address"
          onChange={handleChange}
          value={data.address}
          type="text"
          placeholder="Direccion"
        />
        <div className="multifields">
          <input
            required
            name="codigo_postal"
            onChange={handleChange}
            value={data.codigo_postal}
            type="text"
            placeholder="Codigo postal"
          />
          <input
            required
            name="telefono"
            onChange={handleChange}
            value={data.telefono}
            type="number"
            placeholder="Teléfono"
          />
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
              <p>${getTotalCartAmount(cartItems) === 0 ? 0 : 1000}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              {haveDiscount ? (
                <>
                  <p>Total con descuento del 10%</p>
                  <b>${getTotalCartAmountWithDiscount(cartItems, haveDiscount)}</b> {/* Mostramos el totalAmount actualizado */}
                </>
              ) : (
                <>
                  <p>Total</p>
                  <b>${getTotalCartAmount(cartItems) + 1000}</b> 
                </>
              )}
            </div>
          </div>
          <button type="submit">Pagar</button>
        </div>
      </div>
    </form>
  );
};

export default PlacerOrder;
