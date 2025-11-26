let mongoose=require('mongoose')


let Product=new mongoose.Schema({
    name:{type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    },
    image:[{
        type:String
    }],
    category:{type:String,
        default:''
    },
    price:{type:Number,
        default:0
    },
    offerPrice:{type:Number,
        default:0
    },
    inStock:{type:Boolean,
        default:true
    }
})
module.exports=mongoose.model('AllProduct',Product)