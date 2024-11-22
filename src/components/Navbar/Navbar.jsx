import { NavLink } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'; 
import PropTypes from 'prop-types';
import { FaHome, FaUser, FaSignOutAlt, FaRegUser, FaInfoCircle } from 'react-icons/fa'; 
import { useState } from 'react';

const Navbar = () => {
  const { user, handleLogout } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex items-center justify-between p-4 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 bg-opacity-80 backdrop-blur-md text-purple-900'>
      {/* Logo */}
      <div className='text-purple-900 font-bold text-2xl'>
        Discount PRO
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className='md:hidden' onClick={toggleMenu}>
        <button className='text-purple-900 focus:outline-none'>
          {isOpen ? '✖️' : '☰'} 
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`flex-col md:flex md:flex-row md:gap-5 ${isOpen ? 'flex' : 'hidden'} md:flex`}>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'text-purple-600' : 'text-purple-900')}>
          <FaHome className='inline-block mr-1' /> Home
        </NavLink>
        <NavLink to="/brands" className={({ isActive }) => (isActive ? 'text-purple-600' : 'text-purple-900')}>
          <FaRegUser className='inline-block mr-1' /> Brands
        </NavLink>
        {user && (
          <NavLink to="/my-profile" className={({ isActive }) => (isActive ? 'text-purple-600' : 'text-purple-900')}>
            <FaUser className='inline-block mr-1' /> My Profile
          </NavLink>
        )}
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-purple-600' : 'text-purple-900')}>
          <FaInfoCircle className='inline-block mr-1' /> About Dev
        </NavLink>
      </div>

      {/* Authentication Items */}
      <div className='flex items-center gap-4'>
        {user ? (
          <>
            <span className='text-purple-900 hidden md:block'>Welcome, {user.displayName || user.name}!</span>
            <img src={user.photoURL} alt="User" className='w-10 h-10 rounded-full' />
            <button 
              onClick={handleLogout} 
              className='px-4 py-2 bg-purple-300 text-purple-900 rounded hover:bg-purple-400 flex items-center'
              aria-label="Log out"
            >
              <FaSignOutAlt className='mr-1' /> Log Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className='px-4 py-2 bg-purple-300 text-purple-900 rounded hover:bg-purple-400 flex items-center'>
              <FaUser className='mr-1' /> Login
            </NavLink>
            <NavLink to="/register" className='px-4 py-2 bg-purple-300 text-purple-900 rounded hover:bg-purple-400 flex items-center'>
              <FaUser className='mr-1' /> Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};


Navbar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    displayName: PropTypes.string, 
    photoURL: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;