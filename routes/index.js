const express = require('express')
const router=express.Router()
const isloggedin = require('../middlewares/isloggedin')
const productModel=require('../models/product')
const userModel=require('../models/user')
const mongoose=require('mongoose')

router.get('/',(req,res) => {
    let error=req.flash("error")
    res.render("index",{error,loggedin:false})
})

router.get('/shop',isloggedin,async (req,res) => {
    let products=await productModel.find()
    let success=req.flash("success")
    let already=req.flash("already")
    res.render('shop',{products,success,already})
})

router.get('/cart',isloggedin,async (req,res) => {
    let user=await userModel.findOne({email:req.user.email}).populate("cart")
    let product=req.flash("Product")
    res.render("cart",{user,product})
})

router.post('/addcart/:id',isloggedin,async (req,res) => {
    const productId=req.params.id
    let user=await userModel.findOne({email:req.user.email})
    let prodExist=user.cart.some(product =>{ 
        return (product._id.toString() === productId);
    })
    if(prodExist){
        req.flash("already","Product exist in cart!")
        res.redirect('/shop')
    }
    else{
        user.cart.push(productId)
        await user.save()
        req.flash("success","Product added to cart")
        res.redirect('/shop')
    }
})

router.post('/removecart/:id',isloggedin,async(req,res) => {
    let user=await userModel.findOne({email:req.user.email})
    user.cart=user.cart.filter(product => product._id.toString()!==req.params.id)
    await user.save();
    req.flash("Product","Product removed from cart")
    res.redirect('/cart')
})


module.exports=router