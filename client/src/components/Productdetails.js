
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../JS/ProductsSlice';
import { addToCart } from "../JS/cartSlice";
import './styles/Productdetails.css'; 
import Navbar from "./Navbar";

const Productdetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.Product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    // Logique panier ici (tu peux dispatcher une action Redux si tu en as une)
    dispatch(addToCart(selectedProduct)); 
    console.log("Produit ajouté au panier:", selectedProduct);
    alert("Produit ajouté au panier !");
  };

  if (loading) return <p className="loading">Chargement...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;
  if (!selectedProduct) return <p className="error">Produit introuvable</p>;

  return (
    <div>
      <Navbar/>
    <div className="product-container">
      <img
        src={selectedProduct.Image}
        alt={selectedProduct.name}
        className="product-image"
      />
      <div className="product-info">
        <h2>{selectedProduct.name}</h2>
        <p className="description">{selectedProduct.description}</p>
        <p className="price">{selectedProduct.price} TND</p>
        <p className="category">Catégorie : {selectedProduct.Category}</p>
        <button className="btn" onClick={handleAddToCart}>
          🛒 Commander
        </button>
      </div>
    </div>
    </div>
  );
};

export default Productdetails;
