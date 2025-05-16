const mongoose=require('mongoose') 

mongoose.connect('process.env.MONGO_URL', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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