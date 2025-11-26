let mongoose=require('mongoose')


let address=new mongoose.Schema({
    name:String,
email:String,

city:String,
state:String,
code:Number,
country:String,
number:Number,
    
    
     address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

    
})
module.exports=mongoose.model('userAddress',address)