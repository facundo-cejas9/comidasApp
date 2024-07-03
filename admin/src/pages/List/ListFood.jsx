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
      <div className="user-table">
        <div className="list-table-format title">
          <b>Foto</b>
          <b>Comida</b>
          <b>Precio</b>
          <b>Eliminar</b>
        </div>
        {foodList.map((food, key) => {
          return (
            <div className="list-table-format" key={key}>
              <img src={`${url}/images/${food.image}`} alt={food.name} />
              <p className="bold">{food.name}</p>
              <p className="bold">${food.price}</p>
              <button onClick={() => removeFood(foodList._id)} className="btn btn-danger delete-btn">
                  Eliminar
                </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
