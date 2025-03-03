const express = require('express');
const orderRouter = express.Router();
const Order = require('../models/order');
const order = require('../models/order');


//ADD ORDER
orderRouter.post('/add', async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const result = await newOrder.save();
      res.send({ order: result, msg: "Order effectué" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Erreur en ajout l' Order " });
    }
  });

  //GET
orderRouter.get('/all',async(req,res)=> {
    try {
      let result= await Order.find()
      res.send({order:result,msg:"Tous les commandes"})
    } catch (error) {
      console.log(error);
    }
    })

 //GETbyID
 orderRouter.get('/:id',async(req,res)=> {
    try {
      let result= await Order.findById({_id:req.params.id})
      res.send({order:result,msg:"comande detaillé"})
    } catch (error) {
      console.log(error);
    }
    
    })
  

 //update
orderRouter.put('/:id',async(req,res)=> {
    try {
      let result= await Order.findByIdAndUpdate({_id:req.params.id}, {$set:req.body})          //parametre lawal id w thani chniya bech nbadel
      res.send({order:result,msg:"ordre modifié"})
    } catch (error) {
      console.log(error);
    }
    
    })








module.exports = orderRouter;