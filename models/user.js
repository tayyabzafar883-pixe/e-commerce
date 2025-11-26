let mongoose=require('mongoose')


let schema=new mongoose.Schema({



    name:String,
    email:String,
    password:String,
    img:{
        type:String,
        default:''
    },
   


})
module.exports=mongoose.model('user',schema)