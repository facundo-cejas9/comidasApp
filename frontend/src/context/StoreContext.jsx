import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [discount, setDiscount] = useState(0)
  const [haveDiscount, setHaveDiscount] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [passwordToken, setPasswordToken] = useState("")

  const addToCart = async(itemId) => {
    setCartItems((prevState) => {
      const updatedCartItems = { ...prevState };
      if (updatedCartItems[itemId]) {
          updatedCartItems[itemId] += 1;
      } else {
          updatedCartItems[itemId] = 1;
      }
      return updatedCartItems;
  });
    if (token) {
      await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}})
    }
  };

  const removeFromCart = async(itemId) => {
    setCartItems((prevState) => {
      const updatedCartItems = { ...prevState };
      if (updatedCartItems[itemId] > 1) {
          updatedCartItems[itemId] -= 1;
      } else {
          delete updatedCartItems[itemId];
        
      }
      return updatedCartItems;
  });
    if (token) {
      await axios.post(url+"/api/cart/remove", {itemId}, {headers: {token}})
    }
  };

  const getTotalCartAmount = (cartItems) => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          total += itemInfo.price * cartItems[item];
        }
      }
    }
    return total;
  };


  const getTotalCartAmountWithDiscount = (cartItems, haveDiscount) => {
    let total = getTotalCartAmount(cartItems); // Suponiendo que esta función devuelve el total del carrito
  
    if (haveDiscount) {
      total += 1000; // Sumar el costo de envío al total
      total -= total * 0.1; // Aplicar un descuento del 10% al total con envío
    }
  
    return total;
};

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };


  const deleteAllCartItems = async () => {
    setCartItems({});
    try {
      if (token) {
        await axios.post(url+"/api/cart/remove/all", {}, {headers: {token}})
        toast.success("Todos los elementos del carrito han sido borrados!");
      }
    } catch (error) {
      toast.error("Hubo un error al borrar los elementos del carrito.");
    }
  }


 

 

  const loadCartData = async(token) => {
    const response = await axios.post(url+'/api/cart/get',{}, {headers:{token}})
    setCartItems(response.data.cartData)
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    getTotalCartAmountWithDiscount, 
    discount,
    setDiscount,
    haveDiscount,
    setHaveDiscount,
    deleteAllCartItems,
    recoveryEmail,
    setRecoveryEmail,
    passwordToken,
    setPasswordToken,
    
  


  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
