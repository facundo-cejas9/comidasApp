import { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import { assets } from "../../assets/assets";

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    getTotalCartAmountWithDiscount,
    haveDiscount,
    setHaveDiscount,
    addToCart,
    deleteAllCartItems,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const applyCoupon = () => {
    if (coupon === "DESC10") {
      if (!couponApplied) {
        setCouponApplied(true);
        setHaveDiscount(true); // Activa el descuento en el contexto
        toast.success("Cupón aplicado exitosamente");
      } else {
        toast.error("¡Ya has aplicado este cupón!");
      }
      setCoupon("");
    } else {
      toast.error("Cupón no válido");
      setCouponApplied(false);
    }
  };

  const handleRemoveItems = () => {
    deleteAllCartItems()
    toast.success("Todos los productos han sido eliminados del carrito");
  };

  console.log(cartItems);


  return (
    <div className="cart">
      <>
        {Object.keys(cartItems).length === 0 ? (
          <>
            <div className="empty-cart">
              <img src={assets.addCart} />
              <p>Aún no tienes productos en tu carrito</p>
              <Link to="/#explore-menu">
                <button className="btn-empty-cart">Comenzar a comprar</button>
              </Link>
            </div>
          </>
        ) : (
          <div>
            <h3>Tu carrito de compras</h3>
            <hr></hr>
            {food_list.map((item, index) => {
              if (cartItems[item._id]) {
                return (
                  <div key={index}>
                    <div className="container-cart">
                      <div className="cart-container-image">
                        <img
                          src={`${url}/images/` + item.image}
                          alt={item.name}
                        />
                        <div className="cart-price">
                          <p>{item.name}</p>
                          <p className="price">
                            ${item.price * cartItems[item._id]}
                          </p>
                        </div>
                      </div>

                      <div className="add-cart-counter">
                        <img
                          onClick={() => removeFromCart(item._id)}
                          src={assets.remove_icon_red}
                          alt="Remove item"
                        />
                        <p>{cartItems[item._id]}</p>

                        <img
                          onClick={() => addToCart(item._id)}
                          src={assets.add_icon_green}
                          alt="Add item"
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            <>
              <div className="container-empty-cart">
                <div className="button">
                  <button
                    onClick={handleRemoveItems}
                    className="btn-empty-cart"
                  >
                    Vaciar carrito <img src={assets.deleteCart} />{" "}
                  </button>
                </div>
              </div>
            </>

            <div className="cart-bottom">
              <div className="cart-total">
                <h2>Total de tu compra</h2>
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
                    {
                      haveDiscount? (
                        <p>
                          Precio con descuento del 10%:
                        </p>
                      ) : (
                        <p>Total</p>
                      )
                    }
                    <b>
                      {getTotalCartAmount(cartItems) === 0
                        ? "$0"
                        : couponApplied
                        ? `$${getTotalCartAmountWithDiscount(
                            cartItems,
                            haveDiscount
                          )}`
                        : `$${getTotalCartAmount(cartItems) + 1000}`}
                    </b>
                  </div>
                </div>
                <button onClick={() => navigate("/order")}>Pagar</button>
              </div>
              <div className="cart-promocode">
                <div>
                  <p>Si tienes un cupón de descuento, ingrésalo</p>
                  <div className="cart-promocode-input">
                    <input
                      type="text"
                      placeholder="Tu cupón"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button onClick={applyCoupon}>Aplicar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Cart;
