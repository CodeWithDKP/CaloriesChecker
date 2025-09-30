import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../server/DataContext";

function Navbar() {
  const { user } = useContext(DataContext); 

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          🍏 NutriTrack
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        {user ? (
          <Link to="/profile" className="btn-profile">Profile</Link>
        ) : (
          <>
            <Link to="/signup" className="btn">Signup</Link>
            <Link to="/login" className="btn">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
