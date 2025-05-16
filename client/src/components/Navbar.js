import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imglogo from "./images/logo.png";
import { logout } from "../JS/userSlice";
import axios from "axios";

function Navbar({ hideAuthButtons }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isAuth = localStorage.getItem("token");
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    dispatch(logout());
    navigate("/login");
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredResults([]);
      setShowResults(false);
    } else {
      try {
        const { data } = await axios.get("http://localhost:5800/product/all");
        const products = data.product;
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredResults(filtered);
        setShowResults(true);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    }
  };

  const handleSearchClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <header id="header">
      <nav className="navbar">
        {/* Première ligne */}
        <div className="navbar-top">
          <div className="navbar-logo">
            <Link to="/"><img src={imglogo} alt="Logo" /></Link>
          </div>

          {/* Barre de recherche */}
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="button" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>

            {showResults && filteredResults.length > 0 && (
              <div className="search-results-modal">
                {filteredResults.map((product) => (
                  <div key={product._id} className="search-result-item">
                    <img
                      src={product.Image}
                      alt={product.name}
                      className="result-image"
                    />
                    <div className="result-info">
                      <p className="result-name">{product.name}</p>
                      <p className="result-price">{product.price} TND</p>
                    </div>
                    <Link to={`/product/${product._id}`}>
                      <button className="voir-button" onClick={handleSearchClick}>
                        Voir
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navbar-icones */}
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
              <p className="quantity">{cartTotalQuantity}</p>
            </i>
          </div>

          {/* Menu Hamburger (mobile) */}
          <div className="bars-mobile">
            <button
              className={`mobile-menu-btn11 ${isMenuOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>

        {/* Deuxième ligne */}
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
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="deconnexion-link"
                >
                  Déconnexion
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Menu Mobile */}
        <div className={`nav-content ${isMenuOpen ? "active" : ""}`}>
          

          <div className="mobile-divider"></div>

          {/* Mobile Icons */}
          <div className="mobile-icons">
            <div className="mobile-icon-item">
              <i className="fa-solid fa-user"></i>
              <Link to={user?.isAdmin ? "/dashboard" : "/profil"}>
                Profil
              </Link>
            </div>
            <div className="mobile-icon-item">
              <i className="fa-solid fa-cart-shopping"></i>
              <Link to="/shoppingcard">Panier</Link>
              {cartTotalQuantity > 0 && (
                <span className="mobile-quantity">{cartTotalQuantity}</span>
              )}
            </div>
          </div>

          <div className="mobile-divider"></div>

          {/* Mobile Nav Links */}
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
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="deconnexion-link"
                >
                  Déconnexion
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;