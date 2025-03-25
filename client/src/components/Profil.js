import React from "react";
import { useSelector } from "react-redux";
import "./styles/Profil.css";
import imageprofile from "./images/Profil.png"
const Profil = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <h1 className="loading">Chargement...</h1>;
  }

  return (
    <div className="profile-container">
      {/* En-tête du profil */}
      <div className="profile-header">
        <img src={imageprofile} />
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-email">{user.email}</p>
        <button className="edit-profile-btn">Modifier le Profil</button>
      </div>

      {/* Informations personnelles */}
      <div className="profile-info">
        <h2>Informations personnelles</h2>
        <p><strong>Téléphone:</strong> {user.mobile || "Non renseigné"}</p>
        <p><strong>Adresse:</strong> {user.Address || "Non renseignée"}</p>
      </div>

      {/* Historique des commandes */}
      <div className="order-history">
        <h2>Historique des commandes</h2>
        {user.orders?.length > 0 ? (
          <ul>
            {user.orders.map((order, index) => (
              <li key={index}>
                Commande #{order.id} - {order.date} - <strong>{order.totalPrice} TND</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune commande passée.</p>
        )}
      </div>
    </div>
  );
};

export default Profil;
