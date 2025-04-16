import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../JS/orderSlice";
import "../../styles/CommandesAdmin.css";
import Sidebar from "./Sidebar";
import Navbardash from "./Navbardash";

export default function CommandesAdmin() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.order);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Début du chargement des commandes...");
    dispatch(getAllOrders())
      .unwrap()
      .then(response => {
        console.log("Commandes récupérées avec succès:", response);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des commandes:", error);
      });
  }, [dispatch]);

  console.log("État actuel:", { orders, loading, error });

  // Filtrer les commandes en fonction de la recherche
  const filteredOrders = orders?.filter(order => 
    order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Commandes filtrées:", filteredOrders);

  if (loading) return <div className="loading">Chargement des commandes...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbardash />
        <div className="commandes-admin-container">
          <div className="commandes-header">
            <h2>Gestion des Commandes</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Rechercher par client ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="commandes-table-container">
            <table className="commandes-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Mobile</th>
                  <th>Adresse</th>
                  <th>Date de commande</th>
                  <th>Produits</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.length > 0 ? (
                  filteredOrders.map(order => (
                    <tr key={order._id}>
                      <td>{order.userId?.name || "Anonyme"}</td>
                      <td>{order.userId?.mobile || "Non renseigné"}</td>
                      <td>{order.userId?.Address || "Non renseignée"}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>{order.orderItems?.length || 0} articles</td>
                      <td>{order.totalPrice || 0} TND</td>
                      <td>
                        <span className={`status-badge ${order.isDelivered?.toLowerCase() || 'pending'}`}>
                          {order.isDelivered || 'En attente'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="view-details-btn"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                      Aucune commande trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedOrder && (
            <div className="order-details-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Détails de la Commande #{selectedOrder._id.slice(-6)}</h3>
                  <button 
                    className="close-modal-btn"
                    onClick={() => setSelectedOrder(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="order-info">
                    <p><strong>Client:</strong> {selectedOrder.userId?.name || "Anonyme"}</p>
                    <p><strong>Mobile:</strong> {selectedOrder.userId?.mobile || "Non renseigné"}</p>
                    <p><strong>Adresse:</strong> {selectedOrder.userId?.Address || "Non renseignée"}</p>
                    <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                    <p><strong>Statut:</strong> {selectedOrder.isDelivered || 'En attente'}</p>
                  </div>
                  
                  <div className="order-items">
                    <h4>Articles commandés</h4>
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Produit</th>
                          <th>Modèle</th>
                          <th>Quantité</th>
                          <th>Prix unitaire</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.orderItems?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.model}</td>
                            <td>{item.cartQuantity}</td>
                            <td>{item.price} TND</td>
                            <td>{item.price * item.cartQuantity} TND</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="order-total">
                    <p><strong>Total de la commande:</strong> {selectedOrder.totalPrice} TND</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
