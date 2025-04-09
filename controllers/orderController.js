const Order = require("../models/order");
const authMiddleware = require("../middleware/authMiddleware");

// 🔹 Créer une commande
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({ user: req.user.id, ...req.body });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Erreur backend :", error);
    res.status(500).json({ message: "Erreur lors de la création de commande" });
  }
};

// 🔹 Récupérer les commandes d'un utilisateur
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    console.error("❌ Erreur récupération commandes :", error);
    res.status(500).json({ message: "Impossible de récupérer les commandes" });
  }
};