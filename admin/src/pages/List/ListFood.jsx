import { useEffect, useState } from "react";
import axios from "axios";

import "./List.css";
import { toast } from "react-toastify";

export const ListFood = ({ url }) => {
  
  const [foodList, setFoodList] = useState([]);

  const getListFood = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/delete`, { id: foodId });
    if (response.data.success) {
      toast.success("Comida borrada correctamente!");
    } else {
      toast.error(response.data.message);
    }
    await getListFood();
  };

  useEffect(() => {
    getListFood();
  }, []);

  return (
    <div className="list add flex-col">
      <p>Todas las comidas</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Imagen</b>
          <b>Nombre</b>
          <b>Precio</b>
          <b>Action</b>
        </div>
        {foodList.map((food, key) => {
          return (
            <div className="list-table-format" key={key}>
              <img src={`${url}/images/${food.image}`} alt={food.name} />
              <p>{food.name}</p>
              <p>${food.price}</p>
              <p onClick={() => removeFood(food._id)} className="remove">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
