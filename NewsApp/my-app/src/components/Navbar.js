import React, { Component } from "react";
import {Link} from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            NewsMonkey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  About
                </Link>
              </li>
              <li className="nav-item active">
              </li>
              <li className="nav-item active"><Link to="/business" className="nav-link">business</Link></li> 
              <li className="nav-item active"><Link to="/entertainment" className="nav-link">entertainment</Link></li>
              <li className="nav-item active"><Link to="/" className="nav-link">general</Link></li>
              <li className="nav-item active"><Link to="/health" className="nav-link">health</Link></li>
              <li className="nav-item active"><Link to="/science" className="nav-link">science</Link></li>
              <li className="nav-item active"><Link to="/sports" className="nav-link">sports</Link></li>
              <li className="nav-item active"><Link to="/technology" className="nav-link">technology</Link></li>
               </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
