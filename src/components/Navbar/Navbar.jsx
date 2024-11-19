import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='flex min-h-11 bg-blue-950 text-white gap-7'>

      <div className='text-white font-bold text-2xl align-middle'>
        Discount PRO
      </div>
      <div className='flex gap-5'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/brands">Brands</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/about'>About Dev</NavLink>


      </div>
      <div>

      </div>
     
    </div>
  );
};

export default Navbar;