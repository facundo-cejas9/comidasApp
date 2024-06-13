import './Navbar.css'
import { assets } from '../../assets/assets'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <h2 className='title-admin'><span>A</span>dmin <span>P</span>anel</h2>
      <img className='profile' src={ assets.profile_image } alt="" />
    </div>
  )
}
