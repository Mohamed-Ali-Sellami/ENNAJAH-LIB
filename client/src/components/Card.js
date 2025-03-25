import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../JS/cartSlice'; // Assurez-vous que ce chemin est correct
import "./styles/Card.css";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/shoppingcard");
  };

  return (
    <div className="product-card">
      <img src={data?.Image} alt="image produit" />
      <h3>{data?.name}</h3>
      <p className="description">{data?.description}</p>
      <p className="price">{data?.price} DT</p>
      <p className="stock">En stock</p>
      <button className="buy-btn" onClick={() => handleAddToCart(data)}>
        J'achète
      </button>
    </div>
  );
};

export default Card;
