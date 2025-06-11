import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar(props) {
    let location = useLocation();
    // useEffect(() => {
    //     console.log(location)
    //   }, [location]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        props.showAlert("Logged out successfully", "success");
        window.location.href="/login";
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>

                </div>
                {!localStorage.getItem('token')?<form action="">
                <Link role="button"className="btn btn-primary mx-2"to="/login" >
                    Login
                </Link>
                <Link type="button" className="btn btn-primary mx-2"to="/signup" >
                    Signup
                </Link>
                </form>: <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    );
}
