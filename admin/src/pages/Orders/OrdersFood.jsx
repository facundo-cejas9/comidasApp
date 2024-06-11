import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import "./Orders.css";

export const OrdersFood = ({ url }) => {
  const [orders, setOrders] = useState([]);
 

  const getOrdersList = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      console.log(response.data.data);
      setOrders(response.data.data);
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    getOrdersList();
  }, []);

  const statusHandler = async(event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, { orderId, status: event.target.value });
    if (response.data.success) {
      await getOrdersList();
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="order add">
      <h3>Página de pedidos</h3>
      <div className="order-lists">
        {orders.map((orden, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} />
            <div className="order-data">
              <p className="order-item-food">
                {orden.items.map((item, index) => {
                  if (index === orden.items.length - 1) {
                    return `${item.name} x${item.quantity}`;
                  } else {
                    return `${item.name} x${item.quantity}, `;
                  }
                })}
              </p>
              <p className="order-item-name">{`${orden.address.nombre} ${orden.address.apellido}`}</p>
              <p className="order-item-phone">{orden.address.telefono}</p>
              <div className="order-item-address">
                <p>{orden.address.address}</p>
                <p>{orden.address.codigo_postal}</p>
                <p>Productos: {orden.items.length}</p>
                <p>Precio: ${orden.amount}</p>
              </div>
            </div>
            <select onChange={(event) => statusHandler(event, orden._id)} value={orden.status}>
              <option value="Enviado">Enviado</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
