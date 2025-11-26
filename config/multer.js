let multer=require('multer')

let path=require('path')
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(file)
         let dir = path.join(__dirname, '..', 'images');
        cb(null,dir)

    },
    filename:(req,file,cb)=>{
        
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
let upload=multer({
    storage
})
module.exports=upload