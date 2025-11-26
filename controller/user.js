let user=require('../models/user')
let usermodel=require('../models/user')
let bcrypt=require('bcryptjs')
let jwt=require('jsonwebtoken')
let addressModel=require('../models/Address')
const { get } = require('mongoose')
let cloudinary=require('cloudinary').v2
let fs=require('fs').promises

let register=async(req,res)=>{
  
   try{
       console.log(req.body)
    let {name,email,password}=req.body
   let resp= await usermodel.findOne({email})
   if(!resp){
    let hashPassword=await bcrypt.hash(password,10)
    console.log(hashPassword,'hash')

   let resp=await  usermodel.create({name,email,password:hashPassword})
   console.log('jab user register hova',resp)
  if(resp){
    res.status(201).json({success:true})
  }
   }
   else{
    res.status(400).json({success:false})
   }
   }
    catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }

   

}
let login=async(req,res)=>{
try{
   let {email,password}=req.body
let resp=await usermodel.findOne({email})
if(resp){
   let resp1=await bcrypt.compare(password,resp.password)
   if(resp1){
    let token=jwt.sign({email:resp.email,id:resp._id},process.env.secret,{expiresIn:'1day'})
    res.cookie('token',token)
    res.status(200).json({success:true,message:'succefully login',name:resp.name,img:resp.img})
   }
   else{
      res.status(401).json({success:false,message:'something went wrong'}) 
   }
}
else{
     res.status(401).json({success:false,message:'user not register'}) 
}
}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }

}

let userAddress=async(req,res)=>{
try{
   console.log('welcome to change or add user address',req.body)
let {state,city,number,country,code}=req.body

let resp=await addressModel.findOne({email:req.user.email})
console.log(resp,'why')
if(!resp){
   console.log('chla ya')
let userAddress= await addressModel.create({name:req.body.name,email:req.user.email,state,city,number,country,code})
console.log(userAddress)

res.status(200).json({success:true,address:userAddress})
}
else{
let userAddress=   await addressModel.findOneAndUpdate({email:req.user.email},{$set:{email:req.user.email,state,city,number,country,code,address:req.user.id}},{new:true})
console.log(userAddress,'kia aya ')
   res.status(200).json({success:true,address:userAddress})
}

}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }


}

let getAddress=async(req,res)=>{
  try{
    console.log('jo address aya hy ',req.body)
let resp=await addressModel.findOne({email:req.user.email})
console.log('chlo req tu ayi')
res.status(200).json({success:true,address:resp})
  }
   catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }

}

let lagout=(req,res)=>{
  
res.clearCookie('token')
   res.status(200).json({message:'success'})
}

let getUser=async(req,res)=>{
 try{
     console.log('ayi')
 let resp= await usermodel.find()
 console.log(resp)
 res.status(200).json({success:true,data:resp})
 }
catch(err){
   res.status(500).json({success:false,message:'server issue please try again'})
}
}
let uploadImage=async(req,res)=>{
  try{
   console.log('req for img')
    
console.log(req.file)

  let resp=await cloudinary.uploader.upload(req.file.path)


console.log('url',resp)


  await fs.unlink(req.file.path)

let response=await usermodel.findByIdAndUpdate(req.user.id,{$set:{img:resp.secure_url}},{new:true})
console.log('up',response)
res.status(200).json({success:true,img:response.img,name:resp.name})
  }
  catch(err){
res.status(500).json({success:false,message:'server issue please try again'})
  }




}


module.exports={register,login,userAddress,getAddress,lagout,getUser,uploadImage}