import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  // Function properly declared inside the functional component
  const handleNavItemClick = () => {
    const navCollapse = document.getElementById("navbarSupportedContent");
    if (navCollapse.classList.contains("show")) {
      navCollapse.classList.remove("show");
    }
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          NewsMonkey
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/" onClick={handleNavItemClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleNavItemClick}>
                About
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/business" className="nav-link" onClick={handleNavItemClick}>
                Business
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/entertainment" className="nav-link" onClick={handleNavItemClick}>
                Entertainment
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/" className="nav-link" onClick={handleNavItemClick}>
                General
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/health" className="nav-link" onClick={handleNavItemClick}>
                Health
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/science" className="nav-link" onClick={handleNavItemClick}>
                Science
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/sports" className="nav-link" onClick={handleNavItemClick}>
                Sports
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/technology" className="nav-link" onClick={handleNavItemClick}>
                Technology
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
