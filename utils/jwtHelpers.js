const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET
const expiresIn = process.env.JWT_EXPIRES_IN

exports.sing = (paylod) => {
    return jwt.sign(paylod,secret,{expiresIn})
}

exports.verify = (token) => {
    try{
        return jwt.verify(token,secret)
    }catch(e){
        return false
    }
}