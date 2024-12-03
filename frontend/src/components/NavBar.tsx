import { HiHome } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { Avataar } from "./Avataar";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  return (
    <div className="bg-gray-800 text-white shadow-md">
      {/* Navbar Container */}
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* Brand Logo */}
        <Link
          to="/blogs"
          className="text-2xl md:text-3xl font-semibold font-sevillana hover:text-green-400 transition-all"
        >
          IndiLog
        </Link>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        {/* Full Menu for Larger Screens */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/publish"
            className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-5 py-2 transition-all text-sm shadow-lg"
          >
            NEW
          </Link>
          {localStorage.getItem("username") ? (
            <div className="flex items-center gap-4">
              <Avataar name={localStorage.getItem("username")} size={32} />
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm font-semibold transition-all shadow-md"
            >
              GET STARTED
            </button>
          )}
          <HiHome
            className="text-2xl cursor-pointer hover:text-green-500 transition-all"
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      {/* Dropdown Menu for Smaller Screens */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700">
          <Link
            to="/publish"
            className="block text-center py-2 text-white hover:bg-green-700 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            NEW
          </Link>
          {localStorage.getItem("username") ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Avataar name={localStorage.getItem("username")} size={32} />
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogin();
                setMenuOpen(false);
              }}
              className="block w-full text-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm font-semibold transition-all"
            >
              GET STARTED
            </button>
          )}
          <HiHome
            className="text-2xl mx-auto my-3 cursor-pointer hover:text-green-500 transition-all"
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
