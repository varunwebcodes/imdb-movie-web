import { useState } from "react";
import { Link } from "react-router-dom";
import { HiBars3, HiXMark } from "react-icons/hi2";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md shadow-lg px-6 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */} 
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-yellow-400 text-black font-black font-Montserrat px-2 py-1 rounded">
            IMDb
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-white text-lg font-medium">
          <Link to="/movies/popular" className="hover:text-yellow-400 duration-200">Popular</Link>
          <Link to="/movies/top_rated" className="hover:text-yellow-400 duration-200">Top Rated</Link>
          <Link to="/movies/upcoming" className="hover:text-yellow-400 duration-200">Upcoming</Link>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="text-3xl md:hidden text-white"
          onClick={() => setOpen(true)}
        >
          <HiBars3 />
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-black w-64 h-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="text-3xl mb-6 text-white"
              onClick={() => setOpen(false)}
            >
              <HiXMark />
            </button>

            <div className="flex flex-col gap-6 text-white text-lg font-medium">
              <Link to="/movies/popular" onClick={() => setOpen(false)} className="hover:text-yellow-400">Popular</Link>
              <Link to="/movies/top-rated" onClick={() => setOpen(false)} className="hover:text-yellow-400">Top Rated</Link>
              <Link to="/movies/upcoming" onClick={() => setOpen(false)} className="hover:text-yellow-400">Upcoming</Link>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
