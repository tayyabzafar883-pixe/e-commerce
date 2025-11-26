let jwt=require('jsonwebtoken')

let sellerLogin=(req,res)=>{


if(req.body.email==process.env.seller_email&&req.body.password==process.env.password){
let token=jwt.sign({email:req.body.email},process.env.seller_secret)
res.cookie('seller',token)
res.status(200).json({success:true})
}
else{

    res.status(401).json({success:false,message:'something went wrong'})
}
}
let sellerLagout=(req,res)=>{
  
res.clearCookie('seller')
   res.status(200).json({message:'success'})
}
module.exports={sellerLogin,sellerLagout}
