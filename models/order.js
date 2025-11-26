let mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
    email:String,
  total: Number,
  method: String,
  item: [
    {
      name: { type: String },
      description: { type: String },
      image: [{type:String}],
      category: { type: String },
      price: { type: Number },
      offerPrice: { type: Number },
      inStock: { type: Boolean },
       quantity:{type:Number}
    }
  ],
  createdAt: {
    type: String,
    default: () => new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })
  },
  address:{
    type:mongoose.Schema.Types.ObjectId,
        ref:'userAddress'
  },
 status:{
  type:String,
  default:'Pending'
 }
});

module.exports = mongoose.model('userOrder', orderSchema);
