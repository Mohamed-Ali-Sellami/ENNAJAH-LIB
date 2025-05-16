// cartSlice.js modifié
import { createSlice } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications"; 
import "react-notifications/lib/notifications.css"; 

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  requireAuth: false,  // Nouvel état pour gérer la redirection
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to shopping cart
    addToCart(state, action) {
      // Vérification si un flag d'authentification est passé
      if (action.payload.requireAuth === true) {
        state.requireAuth = true;
        // Pas de notification ici car l'utilisateur n'est pas authentifié
        return;
      }

      // Reset requireAuth flag si l'utilisateur est authentifié
      state.requireAuth = false;
      
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        NotificationManager.success("Produit ajouté", "Commande réussie");
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        NotificationManager.success("Produit ajouté au panier", "Succès");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // Reset requireAuth flag après redirection
    resetAuthRequirement(state) {
      state.requireAuth = false;
    },

    // Les autres reducers restent inchangés
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        NotificationManager.info("Quantité du produit réduite");
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        NotificationManager.error("Produit retiré du panier", "Choisir un autre !");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      NotificationManager.error("Produit retiré du panier");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },

    clearCart(state) {
      state.cartItems = [];
      NotificationManager.success("Panier vide Maintenant !");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { 
  addToCart, 
  decreaseCart, 
  removeFromCart, 
  getTotals, 
  clearCart,
  resetAuthRequirement
} = cartSlice.actions;

export default cartSlice.reducer;