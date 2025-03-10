const mongoose = require("mongoose")

const ModelSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    rate:{
            type:Number,
            default:0
        },
    
    reviews:{
        type:[
            {
                user:{
                    type:mongoose.Schema.ObjectId,
                    ref:"User"
                },
                comment:String,
                rate:Number
            }
        ],
        default:[]
    }
},{
    timestamps:true
})


ModelSchema.set("toJSON",{
    virtuals:true,
    versionKey:false,
    transform:(doc,ret) => {
        delete ret._id
    }
})

const Model = mongoose.model("Movie",ModelSchema)

module.exports = Model