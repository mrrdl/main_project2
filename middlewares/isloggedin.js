let jwt=require('jsonwebtoken')
let userModel=require('../models/user')
let cookieParser=require('cookie-parser')

module.exports=async (req,res,next) => {
    if(!req.cookies.token){
        req.flash("error","login first")
        return res.redirect('/admin')
    }
    try {
        const decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY)
        const user=await userModel
        .findOne({ email: decoded.email })
        .select("-password"); 
        if (!user) {
            req.flash("error", "Invalid token, user not found");
            return res.redirect('/');
        }
        req.user=user
        next()
    } catch (error) {
        console.error("JWT Error: ", error.message); // Log the error for debugging
        req.flash("error", "Invalid or expired token");
        return res.redirect('/');
    }
}