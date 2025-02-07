import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import logo from "../../../public/Expedia_Logo.png";
import ToggleMenu from "../../components/ToggleMenu/ToggleMenu";

const Header = () => {
  const { usersData, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const user = usersData?.length > 0 ? usersData[0] : null;
  const isUserLoggedIn = !!user;

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto bg-white shadow-md py-5 px-5 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-32 md:w-32" alt="Expedia Logo" />
          </div>
        </Link>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-5">
          {/* Get the App Button */}
          <button className="flex items-center gap-2 rounded-full border border-gray-400 py-2 px-4 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <IoMdDownload className="text-blue-500 hover:text-white" /> Get the App
          </button>

          {/* Profile Icon */}
          {isUserLoggedIn ? (
            <button onClick={toggleProfileMenu}>
              <img src={user.img} alt="Profile" className="w-[30px] h-[30px] rounded-full" />
            </button>
          ) : (
            <button onClick={toggleProfileMenu}>
              <FaUserCircle className="text-3xl" />
            </button>
          )}

          {/* Hamburger Menu Button */}
          <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none">
            <MdMenu size={24} />
          </button>
        </div>

        {/* Profile Menu */}
        {isProfileMenuOpen && (
          <div className="absolute right-5 top-16 bg-white shadow-lg rounded-lg p-4 z-50">
            <ToggleMenu />
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50">
            <ul className="p-4 text-gray-700 font-bold text-xl space-y-3">
              <li>
                <Link to="/" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li>
                <Link to="/resorts" onClick={toggleMobileMenu}>Resorts</Link>
              </li>
              <li>
                <Link to="/hosting-dashboard/listings" onClick={toggleMobileMenu}>My Hosting</Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
              </li>
            </ul>
            <div className="w-full border border-gray-300"></div>
            <ul className="p-4 text-gray-700 font-bold text-xl">
              {isUserLoggedIn ? (
                <>
                  <li>
                    <button onClick={logout}>Log Out</button>
                  </li>
                  <li>
                    <Link to="/profile" onClick={toggleMobileMenu}>Profile</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={toggleMobileMenu}>Log In</Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={toggleMobileMenu}>Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 font-semibold text-lg text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/resorts">Resorts</Link>
          <Link to="/hosting-dashboard/listings">My Hosting</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Desktop Profile & Auth Buttons */}
        <div className="hidden md:flex gap-5 justify-end">
          {isUserLoggedIn ? (
            <div className="flex gap-5 items-center">
              <button className="btn btn-sm" onClick={logout}>Log Out</button>
              <Link to="/profile">
                <img src={user.img} alt="Profile" className="w-[50px] h-[50px] rounded-full" />
              </Link>
            </div>
          ) : (
            <>
              <Link className="btn btn-sm" to="/login">Log In</Link>
              <Link className="btn btn-sm" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
