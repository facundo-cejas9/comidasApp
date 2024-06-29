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
  
      setFilteredFoods(filteredByCategory)
  }, [category, food_list, searchTerm]);





  return (
    <div className="food-display" id="food-display">
      {
        category === "All" ? (
          <h2>Todas nuestras comidas</h2>
        ) : (
          <h2>{category}</h2>
        )
      }
      <div className="food-list">
        {filteredFoods.map((food, index) => (
          <FoodItem
            key={index}
            id={food._id}
            name={food.name}
            description={food.description}
            price={food.price}
            image={food.image}
            stars={ food.stars }
          />
        ))}
      </div>
    </div>
  );
};
