import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContexts';
import { Link, NavLink } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { BounceLoader } from 'react-spinners';

const Navbar = () => {
  const { handleLogout, userEmail, userPhoto, loadingProfile } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileHover, setIsProfileHover] = useState(false);


  return (
    <div className="bg-blue-300 py-4 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 relative">
      <div className="flex justify-between items-center relative">

        {/* Logo */}
        <div className="text-3xl text-gray-800 font-bold">
          <Link to="/">MindMark</Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-x-8 font-medium">
          <NavLink to="/all-posts" className={({ isActive }) => isActive ? 'text-blue-500 underline' : 'cursor-pointer'}>
            All Posts
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-500 underline' : 'cursor-pointer'}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-blue-500 underline' : 'cursor-pointer'}>
            Contact
          </NavLink>
        </div>

        <div className="flex items-center gap-x-4 relative">

          {/* Profile image */}

          <div
            className="cursor-pointer relative bg-white p-1 rounded-full hover:ring-2 hover:ring-blue-400"
            onMouseEnter={() => setIsProfileHover(true)}
            onMouseLeave={() => setIsProfileHover(false)}
          >
            {!loadingProfile ? <img
              src={userPhoto || null}
              className="rounded-full w-10 h-10 object-cover"
              alt="Profile"
            /> : <BounceLoader size={40} color='#8EC5FF' />}
            {isProfileHover && <div className='absolute right-1/2 top-full bg-blue-200 py-1 px-2 text-sm rounded-md shadow-md whitespace-nowrap'>{userEmail}</div>}
          </div>



          {/* Desktop Logout */}
          <div
            className="bg-white p-3 rounded-3xl text-gray-800 hover:bg-blue-100 cursor-pointer font-medium hidden md:block"
            onClick={handleLogout}
          >
            LogOut
          </div>

          {/* Menu Icon */}
          <div className="text-3xl cursor-pointer md:hidden" onClick={() => setIsMenuOpen(true)}>
            <MdMenu />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-full bg-blue-300 z-51 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex flex-col gap-y-6 relative">

          <div className='flex justify-between items-center'>

            {/* Logo */}
            <div className="text-3xl font-bold text-gray-800 mt-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>MindMark</Link>
            </div>

            {/* Close Icon */}
            <div className="text-3xl cursor-pointer">
              <MdClose onClick={() => setIsMenuOpen(false)} />
            </div>

          </div>


          {/* Mobile Menu Links */}
          <div className="flex flex-col items-center gap-y-4 text-center font-medium">
            <NavLink
              to="/all-posts"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? 'text-blue-700 underline' : 'cursor-pointer'
              }
            >
              All Posts
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? 'text-blue-700 underline' : 'cursor-pointer'
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? 'text-blue-700 underline' : 'cursor-pointer'
              }
            >
              Contact
            </NavLink>

            {/* Mobile Logout */}
            <div
              className="bg-white text-center w-24 p-2 rounded-3xl text-gray-800 hover:bg-blue-200 font-medium cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              LogOut
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
