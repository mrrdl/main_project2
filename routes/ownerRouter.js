const express = require('express')
const router=express.Router()
const ownerModel=require('../models/owner')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')
const cookieParser=require('cookie-parser')
const isAuth=require('../middlewares/isAuth')

router.get('/create',(req,res) => {
    res.render("owner")
})

router.post('/createuser',async (req,res) => {
    let{fullname,email,password}=req.body
    let owner=await ownerModel.findOne({email:email})
    if(owner){
        bcrypt.compare(password,owner.password,(err,result) => {
            if(result){
                const token=generateToken(owner)
                res.cookie("token",token)
                req.flash("login","Login Success")
                return res.redirect('/owners/admin')
            }
            else{
                req.flash("false","Login Fail")
                return res.redirect('/owners/create')
            }
        })
    }
    else{
        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(password,salt,async (err,hash) => {
                let createOwner=await ownerModel.create({
                    fullname,
                    email,
                    password:hash
                })
                let token=generateToken(createOwner)
                res.cookie("token",token)

                req.flash("Success","Owner Created Successfully")
                res.redirect('/owners/admin')
            })
        })
    }
})

router.get("/admin", async (req, res) => {
    try {
      const token = req.cookies.token;
  
      if (!token) {
        req.flash("false", "You must be logged in to access this page.");
        return res.redirect("/owners/create");
      }
  
      const decoded = jwt.verify(token, process.env.JWT_KEY);
  
      const user = await ownerModel.findOne({ _id: decoded._id });
  
      if (!user) {
        req.flash("false", "User not found.");
        return res.redirect("/owners/create");
      }
  
      const success = req.flash("success");
      const login = req.flash("login");
      const falseLog = req.flash("false");
      const Success = req.flash("Success");
  
      res.render("createProduct", {
        success,
        user,
        login,
        Success,
        falseLog
      });
  
    } catch (err) {
      console.error("JWT Error:", err.message);
      req.flash("false", "Session expired or invalid token.");
      return res.redirect("/owners/create");
    }
});

module.exports=router
