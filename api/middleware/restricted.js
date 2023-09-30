const jwt = require ('jsonwebtoken')
 const {JWT_SECRET} = require('../secrets/index')
 module.exports = (req, res, next) => {
  
  const token = req.headers.authorization
  if(!token){
   return next({status:401, message:'Token required'})
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err){
      next({status:401, message:'token invalid'})
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
};