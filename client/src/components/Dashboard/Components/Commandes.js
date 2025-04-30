import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../JS/orderSlice"; // ajuste le chemin si besoin
import Navbardash from "./Navbardash";
import "../../styles/Commandes.css"; // nouveau fichier css simple

const Commandes = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  if (!orders.length) {
    return <p>Aucune commande trouvée.</p>;
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
                <td>{order.isDelivered}</td>
                <td>{order.totalPrice.toFixed(2)} €</td>
                <td>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="article-item">
                      {item.name} (x{item.cartQuantity})
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
