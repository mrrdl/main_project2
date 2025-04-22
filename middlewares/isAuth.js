const jwt = require('jsonwebtoken');

module.exports= (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "Authorization token required" });
    } 
    try{
        const decoded=jwt.verify(token,process.env.JWT_KEY)
        req.user=decoded
        next()
    }catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(403).json({ message: "Invalid token" });
    }
};