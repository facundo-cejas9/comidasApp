import { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import { FoodItem } from "../FoodItem/FoodItem";

export const FoodDisplay = ({ category, searchTerm }) => {
  const { food_list } = useContext(StoreContext);
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    const filteredByCategory = food_list.filter(
      (food) => category === "All" || category === food.category
    );

    const filteredBySearch = filteredByCategory.filter(
      (food) =>
        searchTerm === "" ||
        (food.name &&
          food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (filteredBySearch.length > 0) {
      setFilteredFoods(filteredBySearch);
    } else {
      // Si no hay resultados después del filtro de búsqueda, mostramos todos los alimentos que coinciden con la categoría
      setFilteredFoods(filteredByCategory);
    }
  }, [category, food_list, searchTerm]);

  return (
    <div className="food-display" id="food-display">
      <h2>Los más pedidos esta semana</h2>
      <div className="food-list">
        {filteredFoods.map((food, index) => (
          <FoodItem
            key={index}
            id={food._id}
            name={food.name}
            description={food.description}
            price={food.price}
            image={food.image}
          />
        ))}
      </div>
    </div>
  );
};
