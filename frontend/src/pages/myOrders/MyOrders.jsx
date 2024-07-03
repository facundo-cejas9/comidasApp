import { useContext, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { EmptyCart } from "../../components/EmptyCart/EmptyCart";

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
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token]);

  return (
    <>
    {data.length === 0 ? (
      <div className="empty-page">
        <EmptyCart textInCart={"Aún no tienes pedidos realizados."} srcImg={assets.parcel_icon} />
      </div>
    ) : (
      <div className="my-orders">
        <div className="container-order">
          <>
            <h2>Mis Órdenes</h2>
            {data.map((order, index) => {
              // Calcular el total de productos en la orden
              let totalOrderProducts = 0;
              order.items.forEach((item) => {
                totalOrderProducts += item.quantity;
              });
  
              return (
                <div key={index} className="my-orders-order">
                  <div className="order-details">
                    <img src={assets.parcel_icon} alt="parcel icon" />
                  </div>
                  <div className="order">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        <p className="order-title">{item.name}</p>
                        <p>
                          Unidades: <span className="item-name">{item.quantity}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <p>
                    Productos: <span className="item-name">{totalOrderProducts}</span>
                  </p>
                  <p>
                    <span
                      className={
                        order.status === "Procesando"
                          ? "orange"
                          : order.status === "Entregado"
                          ? "verde"
                          : "rojo"
                      }
                    >
                      &#x25cf;
                    </span>
                    <b
                      className={
                        order.status === "Procesando"
                          ? "orange"
                          : order.status === "Entregado"
                          ? "verde"
                          : "rojo"
                      }
                    >
                      {" "}
                      {order.status}
                    </b>
                  </p>
                  <p>
                    Total: $<span className="item-name">{order.amount}</span>
                  </p>
                  <button
                    disabled={
                      order.status === "Entregado" || order.status === "Cancelado"
                    }
                    onClick={getOrders}
                  >
                    {order.status === "Entregado"
                      ? "Pedido Entregado"
                      : order.status === "Cancelado"
                      ? "Pedido Cancelado"
                      : "Seguir orden"}
                  </button>
                </div>
              );
            })}
          </>
        </div>
      </div>
    )}
  </>
  

  )

}

export default MyOrders;
