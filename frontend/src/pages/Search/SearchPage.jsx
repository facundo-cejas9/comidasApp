import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { toast } from "react-toastify";
import { FoodItem } from "../../components/FoodItem/FoodItem";

function SearchPage() {
  const url = "http://localhost:4000";

  const [foodSearch, setFoodSearch] = useState([]);

  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  useEffect(() => {
    const fetchFoodByQuery = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/food/search/list?query=${q}`
        );
        if (response.data.success) {
          setFoodSearch(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Axios error:", error);
      }
    };

    if (q) {
      fetchFoodByQuery();
    }
  }, [q]);

  return (
    <div className="container">
     <div className="food-list">
        {q  && foodSearch.length > 0 ? (
            foodSearch.map((food, index) => (
                <FoodItem
                  key={index}
                  id={food._id}
                  name={food.name}
                  description={food.description}
                  price={food.price}
                  image={food.image}
                  stars={ food.stars }
                />
              ))
        ) : <h2>Comida no encontrada</h2>}
      </div>
    </div>
  );
}

export default SearchPage;
