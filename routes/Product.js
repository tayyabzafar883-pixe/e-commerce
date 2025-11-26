let router=require('express').Router()
let upload=require('../config/multer')
let {orderUpdate,getUserOrder,getAllOrder,image,Detail,getProduct,productDetail,stockUpdate,addcart,fetchCart,updateQ,filterCat,setOrder,delCart,getOrder}=require('../controller/Product')
let {userAuth}=require('../middleware/userAuth')
let{sellerAuth}=require('../middleware/sellerAuth')



router.post('/img',sellerAuth,upload.array('images',4),image)
router.post('/detail',sellerAuth,Detail)
router.get('/get',getProduct)
router.get('/productDetail/:id',userAuth,productDetail)
router.put('/stockupdate/:id',sellerAuth,stockUpdate)
router.get('/cartitem',userAuth,fetchCart)
router.post('/cart',userAuth,addcart)
router.post('/updateQ',userAuth,updateQ)
router.get('/filter/:id',userAuth,filterCat)
router.post('/set',userAuth,setOrder)
router.get('/del',userAuth,delCart)
router.get('/getOrder',userAuth,getOrder)
router.get('/getAllOrder',getAllOrder)

router.get('/get/:email',sellerAuth,getUserOrder)
router.post('/orderUpdate',sellerAuth,orderUpdate)
module.exports=router