import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import logo from "../../../public/Marriott-Logo.png";

const Header = () => {
  const { usersData, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = usersData?.length > 0 ? usersData[0] : null;
  const isUserLoggedIn = !!user;

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto bg-slate-300 py-5 px-5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src={logo} className="w-8 md:w-32" alt="Marriott Logo" />
          </Link>
          <h1 className="text-2xl font-bold uppercase text-[#b80606]">Marriott</h1>
        </div>

        {/* Hamburger & User Icon */}
        <div className="md:hidden flex items-center gap-5">
          {isUserLoggedIn ? (
            <Link to="/profile">
              <img src={user.img} alt="Profile" className="w-[30px] h-[30px] rounded-full" />
            </Link>
          ) : (
            <Link to="/profile">
              <FaUserCircle className="text-3xl" />
            </Link>
          )}
          <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none">
            <MdMenu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        <Transition
          show={isMobileMenuOpen}
          enter="transition-transform duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50">
            <ul className="menu p-4 text-gray-700 font-bold text-xl">
              <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
              <li><Link to="/" onClick={toggleMobileMenu}>Bookings</Link></li>
              <li><Link to="/hosting-dashboard/listings" onClick={toggleMobileMenu}>My Hosting</Link></li>
              <li><Link to="/contact" onClick={toggleMobileMenu}>Contact</Link></li>
            </ul>
            <div className="w-4/3 ml-8 border border-gray-400"></div>
            <ul className="menu p-4 text-gray-700 font-bold text-xl">
              {isUserLoggedIn ? (
                <>
                  <li><button onClick={logout}>Log Out</button></li>
                  <li><Link to="/profile" onClick={toggleMobileMenu}>Profile</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" onClick={toggleMobileMenu}>Log In</Link></li>
                  <li><Link to="/register" onClick={toggleMobileMenu}>Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </Transition>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 font-semibold text-lg text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/">Bookings</Link>
          <Link to="/hosting-dashboard/listings">My Hosting</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Conditional Buttons */}
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
              <Link className="btn btn-sm" to="/registration">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
