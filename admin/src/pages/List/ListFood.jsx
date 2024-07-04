import { useEffect, useState } from "react";
import axios from "axios";

import "./List.css";
import { toast } from "react-toastify";

export const ListFood = ({ url }) => {
  
  const [foodList, setFoodList] = useState([]);

  const getListFood = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener la lista de comidas:", error);
      toast.error("Error al obtener la lista de comidas");
    }
  };
  
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/delete`, { id: foodId });
      if (response.data.success) {
        toast.success("Comida borrada correctamente!");
        await getListFood(); // Actualiza la lista después de la eliminación
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error al eliminar la comida");
    }
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
              <button onClick={() => removeFood(food._id)} className="btn btn-danger delete-btn">
                  Eliminar
                </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
