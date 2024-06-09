import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";

import "./Add.css";
import { toast } from "react-toastify";



export const AddFood = ({ url }) => {


  

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Hamburguesa",
    price: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        category: "Hamburguesa",
        price: "",
      });
      setImage(false);
      toast.success("Comida agregada con éxito!")
    } else {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Subir imagen</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
            />
          </label>
          <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              
            />
        </div>
        <div className="add-product-name flex-col">
          <p>Nombre del producto</p>
          <input
            onChange={handleChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Escribe acá"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>descripcion del producto</p>
          <textarea
            onChange={handleChange}
            value={data.description}
            type="text"
            name="description"
            placeholder="Escribe acá"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Categoría</p>
            <select
              onChange={handleChange}
              value={data.category}
              name="category"
              id="category"
              required
            >
              <option value="Hamburguesa">Hamburguesa</option>
              <option value="Pizza">Pizza</option>
              <option value="Tortas">Tortas</option>
              <option value="Empanadas">Empanadas</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Postres">Postres</option>
              <option value="Ensaladas">Ensaladas</option>
              <option value="Pasta">Pasta</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p> Precio</p>
            <input
              onChange={handleChange}
              value={data.price}
              type="number"
              name="price"
              placeholder="Escribe acá"
              required
            />
          </div>
        </div>
        <button  type="submit" className="add-btn">
          Agregar Comida
        </button>
      </form>
    </div>
  );
};
