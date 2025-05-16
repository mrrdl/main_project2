const mongoose=require('mongoose') 

mongoose.connect(
    'mongodb+srv://mmradul38:mradul%409821@cluster0.dbgaivd.mongodb.net/mydb?retryWrites=true&w=majority'
)
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