let router=require('express').Router()
let{register,login,userAddress,getAddress,lagout,getUser,uploadImage}=require('../controller/user')
let {userAuth}=require('../middleware/userAuth')
let{sellerAuth}=require('../middleware/sellerAuth')
let upload=require('../config/multer')
router.post('/register',register)
router.post('/login',login)
router.post('/address',userAuth,userAddress)
router.get('/',userAuth,getAddress)
router.get('/logout',lagout)
router.get('/getUser',sellerAuth,getUser)
router.post('/uploadImg',userAuth,upload.single('img'),uploadImage)

module.exports=router



