const express=require('express')
const productRouter=express.Router()
const Product=require('../models/product')


//add
productRouter.post('/add',async(req,res)=>{
try {
    const produitjdid=new Product (req.body)
    const result= await produitjdid.save()
    res.send({product:result ,msg:"produit ajouté"})
} 
catch (error) {
  console.log(error);  
}
}
)





//get
productRouter.get('/all',async(req,res)=> {
try {
  let result= await Product.find()
  res.send({product:result,msg:"Tous les produit"})
} catch (error) {
  console.log(error);
}

})

//getbyID
productRouter.get('/:id',async(req,res)=> {
  try {
    let result= await Product.findById({_id:req.params.id})
    res.send({product:result,msg:"produit detaillé"})
  } catch (error) {
    console.log(error);
  }
  
  })


//delete

productRouter.delete('/:id',async(req,res)=> {
  try {
    let result= await Product.findByIdAndDelete({_id:req.params.id})
    res.send({product:result,msg:"produit detruit"})
  } catch (error) {
    console.log(error);
  }
  
  })



//update
productRouter.put('/:id',async(req,res)=> {
  try {
    let result= await Product.findByIdAndUpdate({_id:req.params.id}, {$set:req.body})          //parametre lawal id w thani chniya bech nbadel
    res.send({produit:result,msg:"produit detaillé"})
  } catch (error) {
    console.log(error);
  }
  
  })

module.exports=productRouter