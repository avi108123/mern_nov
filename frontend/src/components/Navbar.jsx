// Import React, Link, and other required modules
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

const Navbar = () => {
  let {user,setUser} = useContext(UserContext);

  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Blog Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">My Blog</Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-500 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-500 transition duration-200"
          >
            About
          </Link>
         {
          user&&
          <Link
          to="/myblog"
          className="text-gray-600 hover:text-blue-500 transition duration-200"
        >
          Myblogs
        </Link>
         }
          {
            !user?
              <Link
            to="/login"
            className="text-gray-600 hover:text-blue-500 font-bold transition duration-200"
          >
            Login
          </Link>
            :
            <button onClick={()=>{
              setUser(null);
              localStorage.removeItem("token")
            }}  className="text-gray-600 hover:text-blue-500 font-bold transition duration-200">Logout</button>
          }
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-gray-600 focus:outline-none focus:text-blue-500"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
