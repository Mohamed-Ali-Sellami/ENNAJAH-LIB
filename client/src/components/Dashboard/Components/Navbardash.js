import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './images/logo.png';
import '../../styles/Navbardash.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbardash = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navdash">
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="nav-items">
        <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
          <i className="fas fa-home"></i> <span>Home</span>
        </Link>
        <Link to="/statistiques" className={isActive('/statistiques') ? 'active' : ''}>
          <i className="fas fa-chart-bar"></i> <span>Statistiques</span>
        </Link>
        <Link to="/gestionusers" className={isActive('/gestionusers') ? 'active' : ''}>
          <i className="fas fa-users"></i> <span>Gestion Users</span>
        </Link>
        <Link to="/gestionproduits" className={isActive('/gestionproduits') ? 'active' : ''}>
          <i className="fas fa-box"></i> <span>Gestion Produits</span>
        </Link>
        <Link to="/commandes" className={isActive('/commandes') ? 'active' : ''}>
          <i className="fas fa-shopping-cart"></i> <span>Commandes</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbardash;