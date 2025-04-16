const express = require("express");
const orderRouter = express.Router();
const Order = require("../models/order");

// Ajouter une commande
orderRouter.post("/add", async (req, res) => {
  try {
    console.log("Requête reçue pour ajouter une commande:", req.body);

    const newOrder = new Order(req.body);
    const result = await newOrder.save();
    res.send({ order: result, msg: "Commande enregistrée avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la commande:", error);
    res.status(500).send({ msg: "Erreur en ajoutant la commande" });
  }
});

// Récupérer les commandes par utilisateur avec tri par date
orderRouter.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ orderDate: -1 }); // Tri par ordre décroissant de la date
    res.send({ orders });
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    res.status(500).send({ msg: "Erreur lors de la récupération des commandes" });
  }
});

module.exports = orderRouter;