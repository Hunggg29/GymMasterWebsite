import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';

const Header = () => {
  const { auth, setAuth } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Header - Current auth state:", auth);
  }, [auth]);

  const handleLogout = () => {
    console.log("Logging out - Current auth state:", auth);
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <header className="bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo (Stylized Text) */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-widest">
            Gym<span className="text-white">Master ITSS</span>
          </span>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-8 items-center">
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link to="/" className="text-white hover:text-amber-400 transition-all duration-300">
                Home
              </Link>
            </li>
            {/* <li>
              <Link to="/exercise" className="text-white hover:text-amber-400 transition-all duration-300">
                Exercises
              </Link>
            </li> */}
            {auth?.user?.role === "user"&&(

              <li>
              <Link to="/feedback" className="text-white hover:text-amber-400 transition-all duration-300">
                Feedback
              </Link>
            </li>
            )
            }
            {auth?.user?.role == "admin" && (
              <li>
                <Link to="/dashboard/admin/create-plane" className="text-white hover:text-amber-400 transition-all duration-300">
                  Create Plan
                </Link>
              </li>
            )}
          </ul>

          {auth?.user ? (
            <>
              <Link to={ `/dashboard/${auth.user.role}` } className="text-white font-semibold hover:text-amber-400 transition-all duration-300 capitalize">
                {auth.user.username}
              </Link>
              
             
              <button onClick={handleLogout} className="text-white hover:text-amber-400 transition-all duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-amber-400 transition-all duration-300">
                Register
              </Link>
              <Link to="/login" className="text-white hover:text-amber-400 transition-all duration-300">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-teal-600 py-4">
          <ul className="flex flex-col space-y-4 items-center text-lg">
            <li>
              <Link to="/" className="text-white hover:text-amber-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/exercise" className="text-white hover:text-amber-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                Exercises
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="text-white hover:text-amber-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                Feedback
              </Link>
            </li>
            {auth?.user?.username === "admin" && (
              <li>
                <Link to="/dashboard/admin/create-plane" className="text-white hover:text-amber-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                  Create Plan
                </Link>
              </li>
            )}
            {auth?.user ? (
              <>
                <Link to={auth.user.username === "admin" ? "/dashboard/admin" : "/dashboard/user"} className="text-white font-semibold hover:text-amber-400 transition-all duration-300 capitalize" onClick={() => setMobileMenuOpen(false)}>
                  {auth.user.username}
                </Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-white hover:text-amber-400 transition-all duration-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="text-white hover:text-amber-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
                <Link to="/login" className="text-white hover:text-amber-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;



