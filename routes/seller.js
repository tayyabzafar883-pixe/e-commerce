let router=require('express').Router()
let {sellerLogin,sellerLagout}=require('../controller/Seller')

router.get('/logout',sellerLagout)
router.post('/',sellerLogin)

module.exports=router







