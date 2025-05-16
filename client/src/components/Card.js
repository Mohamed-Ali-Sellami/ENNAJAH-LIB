import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../JS/cartSlice';
import { NotificationManager } from "react-notifications"; 
import "./styles/Card.css";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Obtenir l'état complet du store pour déboguer
  const state = useSelector((state) => state);
  
  // Vérifier si l'utilisateur est connecté en fonction de votre logique d'authentification
  // Vous devez adapter cette logique à votre application
  const checkIfUserIsLoggedIn = () => {
    // Si vous avez un token dans localStorage, l'utilisateur est probablement connecté
    const token = localStorage.getItem('token') || localStorage.getItem('userToken');
    
    // Si vous avez un user ou userId dans localStorage, l'utilisateur est probablement connecté
    const user = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');
    
    // Si vous avez un state.auth dans Redux, utilisez-le pour vérifier
    // l'authentification (décommentez et adaptez si c'est votre cas)
    // const authState = state.auth;
    // if (authState && (authState.isAuthenticated || authState.token || authState.user)) {
    //   return true;
    // }
    
    return !!token || !!user || !!userId;
  };
  
  const isAuthenticated = checkIfUserIsLoggedIn();

  const handleAddToCart = (product) => {
    // Vérifier si l'utilisateur est authentifié avant d'ajouter au panier
    if (!isAuthenticated) {
      // Afficher une notification d'information au lieu d'une notification de succès
      NotificationManager.info("Veuillez vous connecter pour ajouter des produits au panier", "Connexion requise");
      
      // Rediriger vers la page de connexion
      navigate("/login");
      return;
    }
    
    // L'utilisateur est connecté, on peut ajouter le produit au panier
    dispatch(addToCart(product));
    navigate("/shoppingcard");
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="product-card">
      <img src={data?.Image} alt="image produit" />
      <h3>{data?.name}</h3>
      
      <p className={`description ${showFullDescription ? 'expanded' : 'collapsed'}`}>
        {data?.description}
      </p>

      {/* Bouton Voir plus / Voir moins */}
      {data?.description?.length > 250 && (
        <button onClick={toggleDescription} className="toggle-description">
          {showFullDescription ? 'Voir moins' : 'Voir plus'}
        </button>
      )}

      <p className="price">{data?.price} DT</p>
      <p className="stock">En stock</p>
      <button className="buy-btn" onClick={() => handleAddToCart(data)}>
        J'achète
      </button>
    </div>
  );
};

export default Card;