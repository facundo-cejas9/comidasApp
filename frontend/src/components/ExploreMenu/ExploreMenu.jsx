import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";


export const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h2>Que vas a pedir hoy?</h2>
      <p className="explore-menu-text">
        Elegí entre estás diferentes categorías de comidas
      </p>
      <div className="explore-menu-list">
        {menu_list.map((menu, index) => {
          return (
            <div className="container-menu" onClick={ () => setCategory(cat=> cat === menu.menu_name? 'All' : menu.menu_name ) } key={index}>
              <img className={ category === menu.menu_name ? 'active' : '' } src={menu.menu_image} alt={menu.menu_name} />
              <p>{menu.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};
