import React, { useState } from 'react';
import './styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import imglogo from './images/logo.png';
import { logout } from '../JS/userSlice';

function Navbar({ hideAuthButtons }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAuth = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <header id="header">
      <nav className="navbar">
        {/* First row: logo and icons */}
        <div className="navbar-top">
          <div className="navbar-logo">
            <img src={imglogo} alt="Logo" />
          </div>

          <div className="navbar-icons">
            <i className="fa-solid fa-user">
              <Link to={user?.isAdmin ? "/dashboard" : "/profil"} className="iconprofil">
                {isAuth ? (user?.isAdmin ? "Admin" : user?.name) : "Profil"}
              </Link>
            </i>
            <i className="fa-solid fa-cart-shopping">
              <Link to="/shoppingcard" className="iconpanier">Panier</Link>
            </i>
          </div>
        </div>

        {/* Second row: navigation links */}
        <div className="navbar-bottom">
          <ul className="liste">
            <Link to="/"><li>Acceuil</li></Link>
            <Link to="/produitsscolaire"><li>Produits Scolaires</li></Link>
            <Link to="/accessoires"><li>Accessoires Informatiques</li></Link>
            <Link to="/smartphones"><li>Smartphones & GSM</li></Link>
            <Link to="/iptv"><li>IPTV & Récepteurs</li></Link>

            {isAuth && (
              <>
                {/* <li>
                  <Link to={user?.isAdmin ? '/dashboard' : '/profil'}>
                    {user?.isAdmin ? 'Admin' : user?.name}
                  </Link>
                </li> */}
                <li>
                  <a href="#" onClick={handleLogout}>Déconnexion</a>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="bars-mobile">
          <button
            className={`mobile-menu-btn11 ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
            <div className="nav-links">
              <Link to="/"> <div className="nav-item"><a href="#">Acceuil</a></div></Link>
              <Link to="/produitsscolaire"> <div className="nav-item"><a href="#">Produits Scolaires</a></div></Link>
              <div className="nav-item"><a href="#">Accessoires Informatiques</a></div>
              <Link to="/smartphones"> <div className="nav-item"><a href="#">Smartphones & GSM</a></div></Link>
              <Link to="/iptv"><div className="nav-item"><a href="#">IPTV & Récepteurs</a></div></Link>

              {isAuth ? (
                <>
                  {user?.isAdmin ? (
                    <div className="nav-item"><Link to="/dashboard">Admin</Link></div>
                  ) : (
                    <div className="nav-item"><Link to="/profil">{user?.name}</Link></div>
                  )}
                  <div className="nav-item">
                    <a href="#" onClick={handleLogout}>Déconnexion</a>
                  </div>
                </>
              ) : (
                <>
                  {!hideAuthButtons && (
                    <>
                      <div className="nav-item">
                        <Link to="/login">Login</Link>
                      </div>
                      <div className="nav-item">
                        <Link to="/Register">Register</Link>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
