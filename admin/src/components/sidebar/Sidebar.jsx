import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom'



export const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-options'>
            <NavLink to={'/add'} className='sidebar-option'>
                <img src={ assets.add_icon } />
                <p>Agregar items</p>
            </NavLink>

            <NavLink to={'/list'} className='sidebar-option'>
                <img src={ assets.order_icon }  />
                <p>Lista de items</p>
            </NavLink>

            <NavLink to={'/orders'} className='sidebar-option'>
                <img src={ assets.order_icon } />
                <p>Pedidos</p>
            </NavLink>

        </div>
    </div>
  )
}
