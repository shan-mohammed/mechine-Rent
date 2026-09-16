import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaXmark,
  FaHouse,
  FaListCheck,
  FaUserShield,
  FaGauge
} from "react-icons/fa6";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // check if admin logged in
  const isAdminLoggedIn =localStorage.getItem("loggedInAdmin")

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold text-blue-600"
          >
            Kalcom
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
            >
              <FaHouse />
              Home
            </Link>

            <a
              href="/#features"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
            >
              <FaListCheck />
              Features
            </a>
        {/* admin button */}

             {isAdminLoggedIn ? (
              <Link
              to ="/dashboard"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition ">
                <FaGauge/>
                Dashboard
              </Link>
             ) :(
              <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
                 <FaUserShield />
                 Admin Login
              </Link>
             )}


          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-slate-700"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaXmark /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pt-5 pb-2 space-y-3">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              <FaHouse />
              Home
            </Link>

            <a
              href="/#features"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              <FaListCheck />
              Features
            </a>

            {isAdminLoggedIn ? (
  <Link
    to="/dashboard"
    onClick={() => setMenuOpen(false)}
    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700"
  >
    <FaUserShield />
    Dashboard
  </Link>
) : (
  <Link
    to="/login"
    onClick={() => setMenuOpen(false)}
    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700"
  >
    <FaUserShield />
    Admin Login
  </Link>
)}

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;