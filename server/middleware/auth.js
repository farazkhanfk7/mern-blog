const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    // get token from header
    const token = req.header('x-auth-token');
    // if no token ( unauthorised )
    if(!token){
        return res.status(401).json({ msg : "No token. Authorization denied"});
    }
    // if token : add decoded user to req.user
    try{
        const secretKey = process.env.SECRET_KEY
        const decoded = jwt.verify(token , secretKey);
        req.user = decoded.user;
        next();
    }catch(err){
        console.error(err.message)
        res.status(401).json({ msg: "Token is not valid"});
    }
}


const authOwner = (req,res,next) => {
    auth (req,res, () => {
        if(req.user.id === req.params.id){
            next();
        } else {
            return res.status(403).json({ msg : "Access denied. You're not the owner"});
        }
    });
}

module.exports = { auth, authOwner }
