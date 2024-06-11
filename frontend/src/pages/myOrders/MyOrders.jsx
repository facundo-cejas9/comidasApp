import { useContext, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const getOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/userorder`,
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel icon" />
              <p className="order-title">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} x${item.quantity}`;
                  } else {
                    return `${item.name} x${item.quantity}, `;
                  }
                })}
              </p>
              <p className="order-price">${order.amount}</p>
              <p className="order-product">Productos: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b> {order.status}</b>
              </p>
              <button onClick={getOrders}>Seguir orden</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
