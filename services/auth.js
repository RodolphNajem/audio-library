//here, we implement the authenticate token function to authenticate jwt tokens
const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next){
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token){
    return res.status(401).json({error:'Unauthorized: No token provided'});
  }
  jwt.verify(token, 'secretkey' ,(err, decoded) =>{
    if (err){
      return res.status(401).json({error: 'Unauthorized: Invalid token'});
    }
    req.userId = decoded.userId;
    next();
  });
}
    module.exports = {authenticateToken};