const Auth = require('./auth-model')

const checkUsernameExists =  async (req, res, next) => {
    const [user] = await Auth.findByUsername(req.body.username)
    console.log(user)
    try {
        if(user){
            next({status:422, message:"Username taken"})
        } else{
            req.user = user
            next()
        }
    }
    catch (err){
        next(err)
    }
}

const checkUsernameInDb =  async (req, res, next) => {
    const [user] = await Auth.findByUsername(req.body.username)
    console.log(user)
    try {
        if(user){
            req.user = user
            next()
        } else{
            next({status:401, message:'Invalid credentials'})
        }
    }
    catch (err){
        next(err)
    }
}

const checkBodyInfo = (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
        next({status:401, message: 'username and password required'})
    }
    next()
}


module.exports = {
    checkBodyInfo, 
    checkUsernameExists,
    checkUsernameInDb
}