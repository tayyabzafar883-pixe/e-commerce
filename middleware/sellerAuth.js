const jwt = require('jsonwebtoken');

const sellerAuth = (req, res, next) => {
try{
      console.log('you are in seller auth middleware');
  console.log(req.cookies.seller);

  let resp=jwt.verify(req.cookies.seller,process.env.seller_secret)
  if(resp){

    next()
  }
}
catch(err){
    res.status(401).json({ message: 'invalid token' });
}

}

module.exports = { sellerAuth};
