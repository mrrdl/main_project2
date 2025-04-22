const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    bgcolor: { type: String },
    panelcolor: { type: String },
    textcolor: { type: String },
    image: { type: Buffer },
    availablity:{type:String},
    disavail:{type:String},
    timestamp: { type: Date, default: Date.now },
    description: { type: String }
})

module.exports=mongoose.model("product",productSchema)