
import { NavLink } from 'react-router-dom';
import { useUser } from '/Pro-Hero/discount-pro/src/utils/AuthContext'; // Adjust the path based on your folder structure
import PropTypes from 'prop-types';

const Navbar = () => {
  const { user, handleLogout } = useUser(); 

  return (
    <div className='flex items-center justify-between p-4 bg-blue-950 text-white'>
      {/* Logo */}
      <div className='text-white font-bold text-2xl'>
        Discount PRO
      </div>

      {/* Navigation Links */}
      <div className='flex gap-5'>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'text-yellow-300' : 'text-white')} end>
          Home
        </NavLink>
        <NavLink to="/brands" className={({ isActive }) => (isActive ? 'text-yellow-300' : 'text-white')}>
          Brands
        </NavLink>
        {user && (
          <NavLink to="/my-profile" className={({ isActive }) => (isActive ? 'text-yellow-300' : 'text-white')}>
            My Profile
          </NavLink>
        )}
        <NavLink to="/about-dev" className={({ isActive }) => (isActive ? 'text-yellow-300' : 'text-white')}>
          About Dev
        </NavLink>
      </div>

      {/* Authentication Items */}
      <div className='flex items-center gap-4'>
        {user ? (
          <>
            <span className='text-white'>Welcome, {user.name}!</span>
            <img src={user.photoURL} alt="User" className='w-10 h-10 rounded-full' />
            <button 
              onClick={handleLogout} 
              className='px-4 py-2 bg-red-600 rounded hover:bg-red-700'
              aria-label="Log out"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className='px-4 py-2 bg-blue-600 rounded hover:bg-blue-700'>
              Login
            </NavLink>
            <NavLink to="/register" className='px-4 py-2 bg-green-600 rounded hover:bg-green-700'>
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

// Optional: Add PropTypes for type checking
Navbar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    photoURL: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;