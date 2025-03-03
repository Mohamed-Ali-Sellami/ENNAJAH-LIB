const mongoose=require('mongoose')
const schema=mongoose.Schema
const orderschema=new schema( [
    
   {
 
    orderItems: [],
    
    
    isDelivered: {
        type: String,
        default: "pending",
    },


    totalPrice: {
        type: Number,
        default: 0.0,
    },

    // shippingAddress: {
    //     address: { type: String, },
    //     city: { type: String,  },
    //     postalCode: { type: String, },
    //     country: { type: String,  },
    // },

    // paymentMethod: {
    //     type: String,
       
    // },

    // paymentResult: {
    //     id: { type: String },
    //     status: { type: String },
    //     update_time: { type: String },
        
    // },

    // taxPrice: {
    //     type: Number,
      
    //     default: 0.0,
    // },

    // shippingPrice: {
    //     type: Number,
    //     default: 0.0,
    // },

   

    // isPaid: {
    //     type: Boolean,
    //     default: false,
    // },
    
    // paidAt: {
    //     type: Date,
    // },
    
    
    // deliveredAt: {
    //     type: Date,
    // },

}])

const order=mongoose.model('collection_order',orderschema)
module.exports=order
