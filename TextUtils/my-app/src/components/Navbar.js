import React from 'react';
import PropTypes from 'prop-types';
//import './Navbar.css';
import { Link } from 'react-router-dom';
function Navbar(props) {

    return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/about">About us </Link>
            </li>
          </ul>
            </div>
             <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
            <input className="form-check-input "onClick={props.toggleMode} type="checkbox" id="themeSwitch"/>
            <label className="form-check-label" htmlFor="themeSwitch"> Enable Dark Mode</label>
            </div>
      </nav>
    </>
  )
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired
};
  
  Navbar.defaultProps = {
    title: 'Set title here'
  };

  export default Navbar;