import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
  clearCart,
  getTotals,
} from "../JS/cartSlice";
import { createOrder } from "../JS/orderSlice"; // Crée une commande dans l'ordreSlice
import { Link, useNavigate } from "react-router-dom";
import "./styles/Shoppingcard.css";
import Navbar from "./Navbar";
import Footer from './Footer';

const ShoppingCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer les éléments du panier et le montant total
  const { cartItems, cartTotalAmount } = useSelector((store) => store.cart);

  // Calculer le total chaque fois que le panier change
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  // Gérer les actions liées au panier
  const handleDecreaseCart = (product) => dispatch(decreaseCart(product));
  const handleIncreaseCart = (product) => dispatch(addToCart(product));
  const handleRemoveFromCart = (product) => dispatch(removeFromCart(product));

  // Confirmer la commande
  const handleConfirmOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.id;

    if (!userId) {
      alert("Utilisateur non connecté. Veuillez vous connecter.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Votre panier est vide. Ajoutez des produits avant de confirmer la commande.");
      return;
    }

    // Création d'une nouvelle commande
    const newOrder = {
      userId,
      orderItems: cartItems,
      totalPrice: cartTotalAmount,
      isDelivered: "pending",
      orderDate: new Date(),
    };

    // Créer la commande dans le backend
    dispatch(createOrder(newOrder))
      .unwrap()
      .then((response) => {
        console.log("Réponse du serveur:", response);
        alert("Commande confirmée avec succès !");
        dispatch(clearCart());
        navigate("/profil");
      })
      .catch((error) => {
        console.error("Erreur détaillée:", error);
        alert(`Erreur lors de la confirmation de la commande: ${error.message || "Erreur inconnue"}`);
      });
  };

  return (
    <>
      <Navbar />
      <div className="shopping-container">
        <h1 className="shopping-title">Shopping Cart</h1>
        <div className="shopping-cart">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-info">
                  <img src={item.Image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-model">{item.model}</span>
                    <span className="item-id">#</span>
                  </div>
                </div>
                <div className="item-quantity">
                  <button
                    className="quantity-btn minus-btn"
                    onClick={() => handleDecreaseCart(item)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="quantity-input"
                    value={item.cartQuantity}
                    readOnly
                  />
                  <button
                    className="quantity-btn plus-btn"
                    onClick={() => handleIncreaseCart(item)}
                  >
                    +
                  </button>
                </div>
                <div className="item-price-section">
                  <span className="item-price">{item.price} TND</span>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="remove-item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart">Votre panier est vide</p>
          )}
          <div className="cart-footer">
            <Link to="/">
              <button className="continue-shopping">← Continue Shopping</button>
            </Link>
            <button className="confirm-order" onClick={handleConfirmOrder}>
              Confirmez la Commande
            </button>
            <div className="subtotal-section">
              Subtotal: <strong>{cartTotalAmount} TND </strong>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default ShoppingCard;
