const jwt = require("jsonwebtoken");

const authenticate = (req,res,next) =>{
    try{
      const authHeader = req.headers.authorization;
      if(!authHeader){
        return res.status(401).json({message:"No token provider"});
      }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token , "SECERT_KEY");
      req.user = decoded;
      next();
    }
    catch(error){
       return res.status(401).json({message:"Invalid token"});
    }
};

const authorizedRole = (...role) =>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return res.status(403).json({
                message:"Access denied : Insufficient permissions"
            })
        }
        next();
    }
};

module.exports ={authenticate , authorizedRole};