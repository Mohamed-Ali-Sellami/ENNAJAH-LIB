import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder } from '../../../JS/orderSlice';
import { getclient } from '../../../JS/clientSlice';
import Navbardash from './Navbardash';

const CommandesAdmin = () => {
    const dispatch = useDispatch();
    const allOrders = useSelector((store) => store.order?.orders);
    const allClients = useSelector((store) => store.client?.client);
    const loading = useSelector((store) => store.order?.loading);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(getclient());
    }, [dispatch]);

    // Fonction qui récupère les informations du client à partir de son ID
    const getClientInfo = (userId) => {
        return allClients?.find(client => client._id === userId) || { name: "Client inconnu", mobile: "N/A", Address: "N/A" };
    };

    // Formater la date
    const formatDate = (dateString) => {
        if (!dateString) return "Date inconnue";
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Fonction pour obtenir un résumé des produits commandés
    const getOrderItemsSummary = (orderItems) => {
        if (!orderItems || orderItems.length === 0) return "Aucun produit";
        
        return orderItems.map(item => (
            `${item.name} (${item.cartQuantity}x)`
        )).join(", ");
    };

    // Gestion de la suppression d'une commande
    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous supprimer cette commande ?")) {
            dispatch(deleteOrder(id)).then(() => {
                dispatch(getAllOrders());
            });
        }
    };

    // Filtrage des commandes
    const filteredOrders = allOrders?.filter(order => {
        const client = getClientInfo(order.userId);
        const searchMatch = 
            searchQuery === "" || 
            client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.mobile?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            getOrderItemsSummary(order.orderItems).toLowerCase().includes(searchQuery.toLowerCase());
        
        const statusMatch = 
            filterStatus === "all" || 
            (filterStatus === "pending" && order.isDelivered === "pending") ||
            (filterStatus === "delivered" && order.isDelivered === "delivered");
        
        return searchMatch && statusMatch;
    });

    return (
        <div>
            <Navbardash />
            <div className="box-gestionuserdash">
                <h1>Gestion des Commandes</h1>

                <div className="filter-controls">
                    <input
                        type="text"
                        placeholder="Rechercher par client, téléphone ou produit..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Toutes les commandes</option>
                        <option value="pending">En attente</option>
                        <option value="delivered">Livrées</option>
                    </select>
                </div>
            </div>

            <div className="bodygestionuserdash">
                {loading ? (
                    <div className="loading">Chargement des commandes...</div>
                ) : (
                    <table>
                        <thead className="tetetable">
                            <tr>
                                <th>Client</th>
                                <th>Téléphone</th>
                                <th>Adresse</th>
                                <th>Date de commande</th>
                                <th>Produits commandés</th>
                                <th>Total</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders?.map((order) => {
                                const client = getClientInfo(order.userId);
                                return (
                                    <tr key={order._id}>
                                        <td data-label="Client">{client.name}</td>
                                        <td data-label="Téléphone">{client.mobile}</td>
                                        <td data-label="Adresse">{client.Address}</td>
                                        <td data-label="Date">{formatDate(order.orderDate)}</td>
                                        <td data-label="Produits">
                                            {getOrderItemsSummary(order.orderItems)}
                                        </td>
                                        <td data-label="Total">{order.totalPrice} TND</td>
                                        <td data-label="Statut">
                                            <span className={`status-badge ${order.isDelivered}`}>
                                                {order.isDelivered === "pending" ? "En attente" : "Livrée"}
                                            </span>
                                        </td>
                                        <td data-label="Actions">
                                            <div className="settingsadmin">
                                                <button className="deletebtn" onClick={() => handleDelete(order._id)}>
                                                    Delete
                                                </button>
                                                <button className="viewbtn" onClick={() => window.alert(`Détails de la commande ${order._id}`)}>
                                                    Détails
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
                
                {filteredOrders?.length === 0 && !loading && (
                    <div className="no-orders">Aucune commande trouvée</div>
                )}
            </div>
        </div>
    );
};

export default CommandesAdmin;