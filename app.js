const express=require('express')
const app=express()
const cookieParser=require('cookie-parser')
const path=require('path')
const ownerRouter=require('./routes/ownerRouter')
const productRouter=require('./routes/productRouter')
const userRouter=require('./routes/userRouter')
const index=require('./routes/index')
const flash=require('connect-flash')
const expressSession=require('express-session')

require('dotenv').config()

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:'keyboard cat'
    })
)
app.use(flash())
app.use(express.static(path.join(__dirname,'views')))
app.use('/',index)
app.use("/owners",ownerRouter)
app.use("/users",userRouter)
app.use("/products",productRouter)

module.exports = app;