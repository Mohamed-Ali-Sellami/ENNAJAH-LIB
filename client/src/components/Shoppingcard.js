import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart, removeFromCart, clearCart, getTotals } from "../JS/cartSlice";
import { addorder } from "../JS/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Shoppingcard.css";

const ShoppingCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  useSelector AVANT useEffect
  const { cartItems, cartTotalAmount } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]); 

  const handleDecreaseCart = (product) => dispatch(decreaseCart(product));
  const handleIncreaseCart = (product) => dispatch(addToCart(product));
  const handleRemoveFromCart = (product) => dispatch(removeFromCart(product));

  const handleConfirmOrder = () => {
    const newOrder = {
      orderItems: cartItems,
      totalPrice: cartTotalAmount,
      isDelivered: "pending",
    };
    dispatch(addorder(newOrder));
    dispatch(clearCart());
    navigate("/");
  };

  return (
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
                <button className="quantity-btn minus-btn" onClick={() => handleDecreaseCart(item)}>-</button>
                <input type="text" className="quantity-input" value={item.cartQuantity} readOnly />
                <button className="quantity-btn plus-btn" onClick={() => handleIncreaseCart(item)}>+</button>
              </div>
              <div className="item-price-section">
                <span className="item-price">${item.price}</span>
                <button onClick={() => handleRemoveFromCart(item)} className="remove-item">×</button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-cart">Votre panier est vide</p>
        )}
        <div className="cart-footer">
          <Link to="/"><button className="continue-shopping">← Continue Shopping</button></Link>
          <button className="confirm-order" >Confirmez la Commande</button>
          <div className="subtotal-section">
            Subtotal: <strong>${cartTotalAmount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;
