const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  console.log('you are in auth middleware');
  console.log(req.cookies);

  let token = req.cookies.token;

  try {
    console.log(token);
    let resp = jwt.verify(token, process.env.secret);
    console.log(resp);

    
    req.user = {
      id: resp.id,
      email: resp.email
    };

    console.log(req.user);
    next();
  } catch (err) {
    console.log(err.message, 'error');
    res.status(401).json({ message: 'invalid token' });
  }
};

module.exports = { userAuth };
