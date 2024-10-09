import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-200 text-white">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="src/assets/cart.jpg"
            alt="Logo"
            className="h-12"
          />
        </Link>
      </div>

      <ul className="flex space-x-6">
        <li>
          <Link to="/cart" className="hover:underline text-black">
            Cart
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="hover:underline text-black">
            Wishlist
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img
              src="https://via.placeholder.com/40"
              alt="User Profile"
              className="h-10 w-10 rounded-full object-cover hover:ring-2 hover:ring-white"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
