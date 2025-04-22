const userModel=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const {generateToken}=require('../utils/generateToken')

module.exports.registerUser=async (req,res) => {
    try {
    let{email,password,fullname}=req.body;

    let user =await userModel.findOne({email:email})
    if(user){
        res.status(401).send("Your already existed")
    }

    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(password,salt,async (err,hash) => {
            if(err){
                return res.send(err)
            }
            else{
                let user=await userModel.create({
                    fullname,
                    email,
                    password:hash
            })
            let token=generateToken(user)
            res.cookie("token",token)
            res.redirect("/shop")
        }
    })
})
} catch (error) {
    console.log(error.message);
}}

module.exports.loginUser=async (req,res) => {
    let{email,password}=req.body
    let user=await userModel.findOne({email:email})
    if(!user){
        res.send("Something Wrong")
    }
    else{
        bcrypt.compare(password,user.password,(err,result) => {
            if(result){
                let token=generateToken(user)
                res.cookie("token",token)
                res.redirect('/shop')
            }
            else{
                res.send("Something Wrong")
            }
        })
    }
}

module.exports.logout=(req,res) => {
    res.cookie("token"," ")
    res.redirect('/')
}