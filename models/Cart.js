let mongoose=require('mongoose')


let cart=new mongoose.Schema({
    name:{type:String,
      
    },
    product_id:String,
    
    image:[{
        type:String
    }],
   
    totalPrice:{type:Number,
      
    },
    price:Number,
    quantity:Number,
    product_id:String,
    offerPrice:Number,
    email:String,

user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  }
})
module.exports=mongoose.model('product',cart)