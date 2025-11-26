let mongoose=require('mongoose')

let connect=async()=>{
try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('mongoose is connected')
}
catch(error){
    console.log(`this is ${error}`)
}
}
module.exports=connect