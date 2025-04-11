import React from 'react';
import logo from "./images/logo.png";
import { Link } from 'react-router-dom';
import '../../styles/Navbardash.css';

const Navbardash = () => {
  return (
    <div className="navbardash">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className="nav-content">
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">
            <i className="fa-solid fa-house"></i> Home
          </Link>

          <div className="nav-item">
            <i className="fa-solid fa-chart-simple"></i> Statistiques
          </div>

          <Link to="/" className="nav-item">
            <i className="fa-solid fa-person-walking-arrow-right"></i> Exit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbardash;
