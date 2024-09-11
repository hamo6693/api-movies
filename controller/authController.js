const User = require("../models/user")
const jwtHelpers = require("../utils/jwtHelpers")
const bcrypt = require("bcrypt")

exports.login = async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(user && bcrypt.compareSync(password,user.password)){
        res.json({
            success:true,
            data:
            {
                id:user.id,
                name:user.name,
                accessToken:jwtHelpers.sing({sub:user.id})
            
            }})
    }else{
        res.status(401).json({message:"invaild"})
        
    }
   
}

exports.register = async(req,res) => {
    const {name,email,password} = req.body;
    try{
        const user = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,8)
        })
        res.status(200).json({message:"created account"})
    }catch(e) {
        res.status(500).json({message:"someting went wrong"})
    }
}
exports.me = async(req,res) => {
    try{
        const user = await User.findById(req.userId)
        res.json({
            success:true,
            data:{
                id:user.id,
                name:user.name,
                email:user.email,
            }
        })
    } catch(e) {
        res.status(e)
    }
   
}