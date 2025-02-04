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
    setMobileMenuOpen(!isMobileMenuOpen);
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

        {/* Hamburger Button for Mobile */}
        <div className="md:hidden">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  onClick={toggleMobileMenu}
                  className="flex gap-5 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  {isUserLoggedIn ? (
                    <Link to="/profile">
                      <img src={user.img} alt="" className="w-[30px] h-[30px] rounded-full" />
                    </Link>
                  ) : (
                    <FaUserCircle className="text-3xl" />
                  )}
                  <MdMenu size={24} />
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition-transform duration-300"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition-transform duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Disclosure.Panel>
                    <ul className="menu p-4 text-gray-700 font-bold text-xl">
                      <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
                      <li><Link to="/" onClick={toggleMobileMenu}>Bookings</Link></li>
                      <li><Link to="/hosting-dashboard/listings" onClick={toggleMobileMenu}>My Hosting</Link></li>
                      <li><Link to="/contact" onClick={toggleMobileMenu}>Contact</Link></li>
                    </ul>
                    <div className="w-4/3 ml-8 border border-gray-400"></div>
                    {/* Conditional Links */}
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
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>

        {/* Desktop Navigation Links */}
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
