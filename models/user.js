const mongoose = require("mongoose")

const ModelSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxlength:50
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:5
    },
    whatchList:[
        {
            movie:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Movie"
            },
            wathced:Boolean
        }
    ],
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Model = mongoose.model("User",ModelSchema)

module.exports = Model