const express = require('express')
const router=express.Router()
const multer=require('../config/multer-config')
const productModel=require('../models/product')
const ownerModel=require('../models/owner')
const isAuth=require('../middlewares/isAuth')


router.post("/create/:id",multer.single("image"),async (req,res) => {
    try{
        let{name,price,discount,bgcolor,panelcolor,textcolor,availablity,description}=req.body
        let disavail="false"
        let timestamp=new Date()
        if(discount!=0){
            disavail="true"
        }
        let product=await productModel.create({
            image:req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            availablity,
            disavail,
            timestamp,
            description
        })
        let owner=await ownerModel.findOne({_id:req.params.id})
        owner.products.push(product._id)
        await owner.save()
        req.flash("success","Product created successfully")
        res.redirect('/owners/admin')
    }catch(err){
        res.send(err.message)
    }
})

router.get('/availablity=true',async (req,res) => {
    let products=await productModel.find({availablity:'true'})
    let success=req.flash("success")
    let already=req.flash("already")
    res.render('shop',{products,success,already})
})

router.get('/discount',async (req,res) => {
    let products=await productModel.find({disavail:'true'})
    let success=req.flash("success")
    let already=req.flash("already")
    res.render('shop',{products,success,already})
})

router.get('/discount?discount_min=${min}&discount_max=${max}',async (req,res) => {
    let min=req.query.discount_min?parseInt(req.query.discount_min):0
    let max=req.query.discount_max?parseInt(req.query.discount_max):100
    console.log("Min:",min , "Max:",max);
    let products=await productModel.find({discount:{$gte:min,$lte:max}})
    let success=req.flash("success")
    let already=req.flash("already")
    res.render('shop',{products,success,already})
})

router.get('/allproducts',async (req,res) => {
    let products=await productModel.find()
    let success=req.flash("success")
    let already=req.flash("already")
    res.render('preview',{products,success,already})
})

router.get('/newest',async (req,res) => {
    let products=await productModel.find().sort({timestamp:-1}).limit(2)
    let success=req.flash("success")
    let already=req.flash("already")
    res.render('shop',{products,success,already})
})

module.exports=router
