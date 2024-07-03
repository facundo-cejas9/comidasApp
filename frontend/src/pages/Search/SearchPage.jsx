import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import queryString from "query-string";
import axios from "axios";
import { toast } from "react-toastify";

import { FoodItem } from "../../components/FoodItem/FoodItem";
import "./Search.css";

import { assets } from "../../assets/assets";

function SearchPage() {
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
        console.error(error);
      }
    };

    if (q) {
      fetchFoodByQuery();
      setFoodSearch("");
    }
  }, [q]);

  return (
    <div className="search">
      {q && foodSearch.length > 0 ? (
        <>
          <h3>Top resultados para '{q}'</h3>
          <div className="food-list-search">
            {foodSearch.map((food, index) => (
              <FoodItem
                key={index}
                id={food._id}
                name={food.name}
                description={food.description}
                price={food.price}
                image={food.image}
                stars={food.stars}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="error-page">
          <div className="error">
            <img src={assets.search_error} alt="Icono buscador" />
            <h2>No hemos encontrado resultados para '{q}'</h2>
            <p>Intenta buscando otra comida</p>
          </div>

          <div className="paragraph-error"></div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;

// <FoodItem
// key={index}
// id={food._id}
// name={food.name}
// description={food.description}
// price={food.price}
// image={food.image}
// stars={food.stars}
// />
