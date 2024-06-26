import React from 'react'
import { AiOutlineHome,AiOutlineShopping,AiOutlineShoppingCart,AiOutlineLogin,AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import { Link } from 'react-router-dom';
import {FaHeart} from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import "./Navigation.css"
import { useState } from 'react';
import {  useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice';

import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import FavoritesCount from '../Products/FavoritesCount';
const Navigation = () => {
  const {userInfo} = useSelector(state => state.auth);
  const [dropdownOpen,setdropdownOpen] =useState(false);
  const [showSidebar,setshowSidebar] =useState(false);
  const toggleDropdown = () => {
    
    console.log(userInfo.isAdmin)
      setdropdownOpen(!dropdownOpen);
    
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall]= useLogoutMutation();
  const handleMouseEnter = () => {

    setshowSidebar(true);
  };

  const handleMouseLeave = () => {

    setshowSidebar(false);
    setdropdownOpen(false);
  };
  const logoutHandler = async()=>{
    try{
        await logoutApiCall().unwrap()
        dispatch(logout());
        navigate("/login");
    }
    catch(error){
      console.log(error)
    }
  }
  
  return (
    <>
 
      <div
        style={{ zIndex: 9999 }}
        className={`${showSidebar ? "flex" : "hidden"} xl:flex lg:flex hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed `}
        id="navigation-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
          <div className='flex flex-col space-y-4'>
            <Link to="/" className='flex transition-transform hover:translate-x-2 items-center'>
              <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Home</span>
            </Link>
            <Link to="/shop" className='flex transition-transform hover:translate-x-2 items-center '>
              <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Shop</span>
            </Link>
            <Link to="/cart" className='flex transition-transform hover:translate-x-2 items-center '>
              <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Cart</span>
            </Link>
            <Link to="/favorites" className='flex relative transition-transform hover:translate-x-2 items-center'>
              <FaHeart className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Favorites</span>
              <FavoritesCount/>

            </Link>
            
          </div>
          
          <div className="relative ">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-10 space-y-2 bg-gray-800 text-gray-300 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 hover:text-black">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 hover:text-black"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
          
          <ul>
            {!userInfo?(  
              <>        
               <li>
            <Link to="/login" className='flex transition-transform hover:translate-x-2 items-center '>
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Login</span>
            </Link>
            </li>
            <li>
            <Link to="/register" className='flex transition-transform hover:translate-x-2 items-center '>
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Register</span>
            </Link>
            </li>
            </> ):(<></>)}

          </ul>

        </div>
        </div>
    </>
    
  )
}

export default Navigation

