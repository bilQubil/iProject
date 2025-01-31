import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cross_icon, menu_icon, profile_icon, cart_icon } from '../assets/icon/assets_icon';
import { solidDoubleRed } from '../assets/logo/assets_logo';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

  // Check for token on initial render and update the isLoggedIn state
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true); // Set to true if token exists
    } else {
      setIsLoggedIn(false); // Set to false if token does not exist
    }
  }, []); // This effect runs once when the component mounts

  const handleLoginLogout = () => {
    const token = localStorage.getItem('access_token');
  
    if (token) {
      // If the token exists, remove it and log the user out
      localStorage.removeItem('access_token');
      setIsLoggedIn(false); // Update the login state to reflect the logged-out status
      navigate('/login'); // Redirect to the login page
    } else {
      // If the token doesn't exist (i.e., user is already logged out)
      setIsLoggedIn(false); // Ensure the state reflects logged-out status
      navigate('/login'); // Redirect to the login page
    }
  };

  return (
    <div className="flex items-center py-5 font-medium">
      <img src={solidDoubleRed} className="w-20" alt="logo" />
      <ul className="hidden sm:flex gap-5 text-sm px-6 text-gray-800">
        <NavLink
          to={"/pub/products"}
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center justify-center gap-1 text-red-500'
              : 'flex flex-col items-center justify-center gap-1 text-gray-800'
          }
        >
          <p>Home</p>
          <hr className="hidden w-10 border-none h-[1.5px] bg-red-500" />
        </NavLink>
        <NavLink
          to={"/pub/collections"}
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center justify-center gap-1 text-red-500'
              : 'flex flex-col items-center justify-center gap-1 text-gray-800'
          }
        >
          <p>Collection</p>
          <hr className="hidden w-16 border-none h-[1.5px] bg-red-500" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6 ml-auto px-1">
        {/* Cart Icon */}
        <img
          src={cart_icon}
          className="w-4 cursor-pointer"
          alt="cart"
          onClick={() => navigate("/cart")} // Redirect to /cart on click
        />
        
        {/* Profile Dropdown */}
        <div className="group relative">
          <img src={profile_icon} className="w-4 cursor-pointer" alt="profile" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-3">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-50 text-gray-900">
              <a className="text-center cursor-pointer hover:bg-red-500 hover:text-white" href="/pub/collections">
                Order
              </a>
              {/* Conditionally render Login/Logout based on login state */}
              <a
                className="text-center cursor-pointer hover:bg-red-500 hover:text-white"
                onClick={handleLoginLogout}
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={menu_icon}
          alt="menu"
          className="w-4 cursor-pointer sm:hidden"
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}
      >
        <div className="flex flex-col text-gray-800 gap-5 px-5 py-10">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-2 ml-auto cursor-pointer">
            <p>Back</p>
            <img src={cross_icon} alt="cross" className="h-4 rotate-180" />
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-center" to="/pub/products">
            Home
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-center" to="/pub/collections">
            Collection
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
