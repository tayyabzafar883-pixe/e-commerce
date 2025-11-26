
let productModel=require('../models/Product')
let cart=require('../models/Cart')
let cloudinary=require('cloudinary').v2
let fs=require('fs').promises
let orderModel=require('../models/order')

let image=async(req,res)=>{
  try{
    let picture=[]
console.log(req.files)
for(let i=0;i<=req.files.length-1;i++){
  let resp=await cloudinary.uploader.upload(req.files[i].path)
  picture.push(resp.secure_url)
}


for(let i=0;i<=req.files.length-1;i++){

  await fs.unlink(req.files[i].path)
}

let result=await productModel.create({image:picture})
console.log(result,'img')
if(result){
 res.status(200).json({success:true,images:result.image,Id:result._id})
}
  }
  catch(error){
    console.log(error.message)

     res.status(500).json({success:false,message:'server issue please try again'})
  }




}

let Detail=async(req,res)=>{
  try{
    let {name,description,category,price,offerPrice,id}=req.body

  let respp=await productModel.findByIdAndUpdate(id,{$set:{name,description,category,price,offerPrice}},{new:true})
res.status(200).json({success:true,message:'add product successfully'})
  }
  catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }

}
let getProduct=async(req,res)=>{
try{
      let product =await productModel.find()
  
    res.status(200).json(product)
}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }

}

let productDetail=async(req,res)=>{

try{
   let resp= await productModel.findById(req.params.id)
 res.status(200).json({ success:true,resp})
}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }

  
}
let stockUpdate=async (req,res)=>{
try{
  console.log(req.params.id,'id')

let resp=await productModel.findById(req.params.id)
console.log(resp,'product')
let updated_product=   await  productModel.findByIdAndUpdate(req.params.id,{$set:{inStock:!resp.inStock}},{new:true})
console.log('update',updated_product)
if(updated_product){
  res.status(200).json({success:true})
}
}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }


}


let addcart=async(req,res)=>{
  try{
    console.log('enter in addcart')
  console.log(req.user.email,'user')
console.log(req.body,'jo data cart ma dalna hy')
let {_id,name,image,price,offerPrice}=req.body
let resp= await cart.findOne({product_id:_id,email:req.user.email})
console.log(resp,'kia data cart ma hy bi sai')
console.log('jo data aya',req.body)

if(!resp){
  let resp1=await cart.create({name, offerPrice,image,price,totalPrice:offerPrice*1,quantity:1,product_id:_id,user_id:req.user.id ,email:req.user.email})

  res.status(200).json({success:true})
}
else{
 
let resp3= await cart.findOneAndUpdate({product_id:_id,email:req.user.email},{$set:{totalPrice:(resp.offerPrice)*(resp.quantity+1),quantity:(resp.quantity+1)}},{new:true})

res.status(200).json({success:true,data:resp3})
}
  }
   catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }


}

let fetchCart=async(req,res)=>{
try{
    let total=0
  console.log('in fetch cart')
  console.log(req.user.email)
  console.log('fetch cart')
 let cartProduct=await cart.find({email:req.user.email})

 console.log(cartProduct, cartProduct.length,'cart product for calculation')
 for(let i=0;i<=cartProduct.length-1;i++){
total=cartProduct[i].totalPrice+total
 }
res.status(200).json({ success:true,data:cartProduct,amount:total})
}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }


}


let updateQ=async(req,res)=>{

 try{
  console.log(req.body)
 let resp=await cart.findOne({product_id:req.body.id,email:req.user.email})
 console.log(resp)
 if(req.body.action=='increase'){
let resp2=await cart.findOneAndUpdate({product_id:req.body.id,email:req.user.email},{$set:{quantity:resp.quantity+1,totalPrice:(resp.offerPrice)*(resp.quantity+1)}},{new:true})
res.status(200).json({success:true,message:'item quantity increase'})

 }
 if(req.body.action=='decrease'){
if(resp.quantity!=1){
  let resp2=await cart.findOneAndUpdate({product_id:req.body.id,email:req.user.email},{$set:{quantity:resp.quantity-1,totalPrice:(resp.offerPrice)*(resp.quantity-1)}},{new:true})
res.status(200).json({success:true,message:'item quantity decrease'})
}
res.status(200).json({success:true})
 }
 if(req.body.action=='remove'){
 let resp3=await cart.findOneAndDelete({product_id:req.body.id,email:req.user.email})
 res.status(200).json({success:true,message:'item remove from cart successfully'})
 }
 }
  catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }


 
}
let filterCat=async(req,res)=>{
try{
    console.log(req.params.id)
  let resp=await productModel.find({category:req.params.id})
  console.log('kia aya data',resp)

  res.status(200).json({success:true,resp})
}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }

}

let delCart=async(req,res)=>{
try{
  
 let resp=await  cart.deleteMany({email:req.user.email})
 console.log(resp,'dele cart')

 res.status(200).json({success:true})
}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }


  

}

let setOrder=async(req,res)=>{
try{
   console.log()
  let totalAmount=0
console.log('orders page',req.body,'data')
let cartItem=await cart.find({email:req.user.email})
for(let i=0;i<=cartItem.length-1;i++){

totalAmount=totalAmount+cartItem[i].totalPrice
}


let resp=await orderModel.create({method:req.body.method,total:totalAmount,item:cartItem,email:req.user.email,address:req.body.address})
console.log(resp,'orders')

res.status(200).json({message:'success'})
} catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }



}

let getOrder=async(req,res)=>{
try{
  let ress=await orderModel.find({email:req.user.email}).populate('address')
console.log(ress,'order mila')
res.status(200).json({success:true,ress})
}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }


}
let getAllOrder=async(req,res)=>{
try{
  let ress=await orderModel.find().populate('address')
console.log(ress,'order mila')
res.send(ress)
}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }


}
let getUserOrder=async(req,res)=>{
try{
  console.log(req.params,'email')
  let ress=await orderModel.find({email:req.params.email}).populate('address')
console.log('kia mila',ress)
res.status(200).json({success:true,ress})

}
 catch(err){
     res.status(500).json({success:false,message:'server issue please try again'})
  }


}

let orderUpdate=async(req,res)=>{
try{
    console.log(req.body)
let resp=await orderModel.findByIdAndUpdate(req.body.id,{$set:{status:req.body.status}})
console.log(resp)

res.status(200).json({success:true})
}
catch(error){
  res.status(500).json({success:false,message:'server issue please try again'})
}
}


module.exports={image,Detail,getProduct,productDetail,stockUpdate,addcart,fetchCart,updateQ,filterCat,setOrder,delCart,getOrder,getAllOrder,getUserOrder,orderUpdate}

