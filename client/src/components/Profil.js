import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersByUser } from "../JS/orderSlice";
import "./styles/Profil.css";
import imageprofile from "./images/Profil.png";
import Navbar from "./Navbar";

const Profil = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    console.log("Profil - User ID:", user?._id);
    if (user?._id) {
      console.log("Tentative de récupération des commandes pour l'utilisateur:", user._id);
      dispatch(getOrdersByUser(user._id))
        .unwrap()
        .then(response => {
          console.log("Commandes récupérées avec succès:", response);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des commandes:", error);
        });
    }
  }, [dispatch, user?._id]);

  console.log("État actuel dans Profil:", { orders, loading, error });

  if (!user) {
    return <h1 className="loading">Chargement...</h1>;
  }

  return (
    <div>
      <Navbar/>
      <div className="profile-container">
        <div className="profile-header">
          <img src={imageprofile} alt="Profil" />
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <button className="edit-profile-btn">Modifier le Profil</button>
        </div>

        <div className="profile-info">
          <h2>Informations personnelles</h2>
          <p><strong>Téléphone:</strong> {user.mobile || "Non renseigné"}</p>
          <p><strong>Adresse:</strong> {user.Address || "Non renseignée"}</p>
        </div>

        <div className="order-history">
          <h2>Historique des commandes</h2>
          {loading ? (
            <p className="loading">Chargement des commandes...</p>
          ) : error ? (
            <p className="error">Erreur lors du chargement des commandes: {error}</p>
          ) : orders && orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Commande #{order._id.slice(-6)}</span>
                    <span className="order-date">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                    <span className={`order-status ${order.isDelivered?.toLowerCase() || 'pending'}`}>
                      {order.isDelivered || 'En attente'}
                    </span>
                  </div>
                  <div className="order-items">
                    {order.orderItems?.map((item, index) => (
                      <div key={index} className="order-item">
                        <img src={item.Image} alt={item.name} className="order-item-image" />
                        <div className="order-item-details">
                          <span className="order-item-name">{item.name}</span>
                          <span className="order-item-model">{item.model}</span>
                          <span className="order-item-quantity">Quantité: {item.cartQuantity}</span>
                          <span className="order-item-price">{item.price} TND</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-total">
                    Total: <strong>{order.totalPrice} TND</strong>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-orders">Aucune commande passée.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;