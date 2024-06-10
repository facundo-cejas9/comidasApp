import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);

  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";

  const [token, setToken] = useState("");

  const addToCart = async(itemId) => {
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: (prevState[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}})
    }
  };

  const removeFromCart = async(itemId) => {
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: (prevState[itemId] || 0) - 1,
    }));

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

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
