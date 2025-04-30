import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../JS/orderSlice";
import Navbardash from "./Navbardash";
import "../../styles/Commandes.css";

const Commandes = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (loading) return (
    <div>
      <Navbardash />
      <div className="loading-spinner"></div>
    </div>
  );
  
  if (error) return (
    <div>
      <Navbardash />
      <div className="error-message">Erreur: {error}</div>
    </div>
  );

  if (!orders.length) {
    return (
      <div>
        <Navbardash />
        <p className="no-orders">Aucune commande trouvée.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbardash />
      <div className="commandes-container">
        <h1>Liste des Commandes</h1>
        <table className="commandes-table">
          <thead>
            <tr>
              <th>Nom Client</th>
              <th>Mobile</th>
              <th>Adresse</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Prix Total</th>
              <th>Articles</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.userId?.name} {order.userId?.lastname}</td>
                <td>{order.userId?.mobile}</td>
                <td>{order.userId?.Address}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td style={{ color: order.isDelivered ? '#27ae60' : '#e74c3c' }}>
                  {order.isDelivered ? 'Livré' : 'En cours'}
                </td>
                <td>{order.totalPrice.toFixed(2)} TND </td>
                <td>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="article-item">
                      {item.name} (x{item.cartQuantity}) - {item.price.toFixed(2)} TND - 
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Commandes;