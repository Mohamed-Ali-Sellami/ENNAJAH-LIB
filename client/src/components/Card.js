import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../JS/cartSlice';
import "./styles/Card.css";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleAddToCart = (product) => {
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
