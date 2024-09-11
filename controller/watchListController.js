
const User = require("../models/user")

exports.add = async(req,res) => {
    const {movie,wathced} = req.body
    const user = await User.findById(req.userId)
    const index = user.whatchList.findIndex(e=> e.movie == movie)
    if(index > -1) {
        user.whatchList[index].wathced = wathced
    }else{
        user.whatchList.push({movie,wathced})
    }
    await user.save()

    res.json({success:true})
}


exports.delete = async(req,res) => {
    const {movie} = req.params
    const user = await User.findById(req.userId)
    user.whatchList = user.whatchList.filter(e=> e.movie != movie)
    await user.save()
    res.json({success:true})
}

exports.list = async(req,res) => {
    const user = await User.findById(req.userId).select("-whatchList._id").populate("whatchList.movie",["name","],)

    res.json({success:true,data:user.whatchList})
}