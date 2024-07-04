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
      setOrders(response.data.data);
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    getOrdersList();
  }, []);

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await getOrdersList();
    } else {
      toast.error(response.data.message);
    }
  };

  const totalOrderProducts = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  return (
    <>
    {
      orders.length === 0 ? (
        <div className="order add">
          <h2>No hay pedidos en este momento</h2>
        </div>
      ) : (
        
      <div className="order add">
        <h3>Página de pedidos</h3>
        <div className="order-lists">
          {orders.map((orden, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} />
              <div className="order-data">
                <p>
                  Pedido:{" "}
                  <span className="order-item-name">
                    {orden.items.map((item, index) => {
                      if (index === orden.items.length - 1) {
                        return `${item.name} x${item.quantity}`;
                      } else {
                        return `${item.name} x${item.quantity}, `;
                      }
                    })}
                  </span>
                </p>
                <p>
                  Nombre:{" "}
                  <span className="order-item-name">{`${orden.address.nombre} ${orden.address.apellido}`}</span>
                </p>
                <p>
                  Teléfono:{" "}
                  <span className="order-item-name">
                    {orden.address.telefono}
                  </span>
                </p>
                <div className="order-item-address">
                  <p>
                    Dirección:{" "}
                    <span className="order-item-name">
                      {orden.address.address}
                    </span>
                  </p>
                  <p>
                    Código postal:{" "}
                    <span className="order-item-name">
                      {orden.address.codigo_postal}
                    </span>
                  </p>
                  <p>
                    Productos:{" "}
                    <span className="order-item-name">
                      {totalOrderProducts(orden.items)}
                    </span>
                  </p>
                  <p>
                    Precio:{" "}
                    <span className="order-item-name">${orden.amount}</span>
                  </p>
                </div>
              </div>
              <select
                onChange={(event) => statusHandler(event, orden._id)}
                value={orden.status}
              >
                <option value="Procesando" disabled>
                  {" "}
                  Procesando{" "}
                </option>
                <option value="Entregado">Entregado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      )
    }
    </>
  );
};
