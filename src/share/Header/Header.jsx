import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const Header = () => {
  const { usersData, login, registration } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = usersData[0];

  if (!user) {
    return <p>No user data available</p>;
  }


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const isUserLoggedIn = usersData && usersData.length > 0;

  console.log(user)

  return (
    <div className="container mx-auto bg-slate-300 py-5 px-5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link to='/'>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png"
              className="w-20 md:w-32"
              alt="Airbnb Logo"
            />
          </Link>
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
                  {
              usersData?(
                <Link to="profile" className=""><img  src={user.img} alt=""  className="w-[30px] h-[30px]  rounded-full"/></Link >
              ) : (
                <Link className="text-3xl" to="profile"><FaUserCircle /></Link>
              )
            }
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
                      <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                      <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Bookings</Link></li>
                      <li><Link to="/hosting-dashboard/listings" onClick={() => setMobileMenuOpen(false)}>My Hosting</Link></li>
                      <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
                    </ul>
                    <div className="w-4/3 ml-8 border border-gray-400"></div>
                    {/* Conditional Links */}
                    <ul className="menu p-4 text-gray-700 font-bold text-xl">
                      {isUserLoggedIn ? (
                        <>
                          <li><Link to="/" onClick={() => { /* Handle logout */ }}>LogOut</Link></li>
                          <li><Link to="profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link></li>
                        </>
                      ) : (
                        <>
                          <li><Link to="/login" onClick={() => setMobileMenuOpen(false)}>LogIn</Link></li>
                          <li><Link to="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link></li>
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
          <Link to="hosting-dashboard/listings">My Hosting</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Conditional Buttons */}
        <div className="hidden md:flex gap-5 justify-end">
          {isUserLoggedIn ? (
            <div className="flex gap-5 justify-center items-center">
              <Link className="btn btn-sm" to="/" onClick={() => { /* Handle logout */ }}>Log Out</Link>

              {
              usersData?(
                <Link to="profile" className=""><img  src={user.img} alt=""  className="w-[50px] h-[50px]  rounded-full"/></Link >
              ) : (
                <Link className="text-3xl" to="profile"><FaUserCircle /></Link>
              )
            }
            </div>
          ) : (
            <>
              <Link className="btn btn-sm" to="/login">LogIn</Link>
              <Link className="btn btn-sm" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;