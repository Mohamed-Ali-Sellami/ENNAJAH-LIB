import React, { useState } from "react";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imglogo from "./images/logo.png";
import { logout } from "../JS/userSlice";

function Navbar({ hideAuthButtons }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAuth = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {cartTotalQuantity} = useSelector((state) => state.cart)
  const [selectedCategory, setSelectedCategory] = useState("all");
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  


  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Recherche:", searchQuery);
  };

  return (
    <header id="header">
      <nav className="navbar">
        {/* First row: logo, search bar, and icons */}
        <div className="navbar-top">
          <div className="navbar-logo">
            <img src={imglogo} alt="Logo" />
          </div>

          {/* Barre de recherche */}
          <form className="search-container" onSubmit={handleSearchSubmit}>
  <div className="search-box">
    <input
      type="text"
      className="search-input"
      placeholder="Rechercher un produit..."
      value={searchQuery}
      onChange={handleSearchChange}
    />
    <button type="submit" className="search-button">
      <i className="fas fa-search"></i>
    </button>
  </div>
</form>




          <div className="navbar-icons">
            <i className="fa-solid fa-user">
              <Link
                to={user?.isAdmin ? "/dashboard" : "/profil"}
                className="iconprofil"
              >
                {isAuth ? (user?.isAdmin ? "Admin" : user?.name) : "Profil"}
              </Link>
            </i>
            <i className="fa-solid fa-cart-shopping">
              <Link to="/shoppingcard" className="iconpanier">
                Panier
              </Link>
              <p className="quantity"> {cartTotalQuantity} </p>
            </i>
          </div>
        </div>

        {/* Second row: navigation links */}
        <div className="navbar-bottom">
          <ul className="liste">
            <li>
              <Link to="/">Acceuil</Link>
            </li>
            <li>
              <Link to="/produitsscolaire">Produits Scolaires</Link>
            </li>
            <li>
              <Link to="/accessoires">Accessoires Informatiques</Link>
            </li>
            <li>
              <Link to="/smartphones">Smartphones & GSM</Link>
            </li>
            <li>
              <Link to="/iptv">IPTV & Récepteurs</Link>
            </li>

            {isAuth && (
              <li>
                <button  className="btndeconnexion" onClick={handleLogout}>Déconnexion</button>
              </li>
            )}
          </ul>
        </div>

        {/* Menu Hamburger */}
        <div className="bars-mobile">
          <button
            className={`mobile-menu-btn11 ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <div className={`nav-content ${isMenuOpen ? "active" : ""}`}>
            <div className="nav-links">
              <div className="nav-item">
                <Link to="/" onClick={toggleMenu}>
                  Acceuil
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/produitsscolaire" onClick={toggleMenu}>
                  Produits Scolaires
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/accessoires" onClick={toggleMenu}>
                  Accessoires Informatiques
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/smartphones" onClick={toggleMenu}>
                  Smartphones & GSM
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/iptv" onClick={toggleMenu}>
                  IPTV & Récepteurs
                </Link>
              </div>

              {isAuth && (
                <div className="nav-item">
                  <button onClick={handleLogout}>Déconnexion</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;