const mongoose=require('mongoose')
const schema=mongoose.Schema
const productschema=new schema( {

name:{
    type:String,
    // required:true
},

price: {
type:String,
// required:true 

},
Image:{
    type:String,
    default:"..."
},
description:{
    type:String,
    default:"..."
},

Category:{
    type:String,
    default:"..."
}
})

const product=mongoose.model('collection_product',productschema)
module.exports=product