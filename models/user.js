const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/scatch")

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        minlength:3,
        trim:true
    },
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    isAdmin:Boolean,
    orders:[
        
    ],
    contact:Number,
    picture:String
})

module.exports=mongoose.model("user",userSchema)