import React from "react";
import logo1234 from "./logo1234.jpg";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <a className="navbar-brand" href="#">
        <img src={logo1234} alt="Your Logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/sign">
              Public access
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/sign" data-target="data-owner">
              Admin
            </a>
          </li>
          <li className="nav-item">
            <button className="contact">Contact</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
