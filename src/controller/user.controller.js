const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateToken = (user) =>{
    return jwt.sign(
        {
            id:user.id,
            role:user.role,
        },
        "SECRET_KEY",
        {expiresIn:"1d"}
    )
}


exports.register = async(req,res)=>{
    try{
     const {name , email , password , role} = req.body;
     if(!name|| !email || !password || !role){
        return res.status(400).json({
            message:"All fields are required",
        });
     }
     const validRoles = ["ADMIN", "ANALYST", "VIEWER"];
     if(!validRoles.includes(role)){
        return res.status(400).json({
            message:"Invaild role",
        });
     }
     const existingUser = await prisma.user.findUnique({
        where:{email},
     })
     if(existingUser){
        return res.status(400).json({
            message:"User already exits with this email",
        });
     }
     const hashedPassword = await bcrypt.hash(password , 10);
     const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
            role,
        },
     });
      const token = generateToken(user);
      res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        },
        token,
      })
    }
    catch(error){
    console.log("Register Error:", error);
    res.status(500).json({
        message:"Internal server error",
    })
    }
};


exports.login = async(req,res) =>{
    try{

         const {email , password} = req.body;
         if(!email ||  !password){
            return res.status(400).json({
                message:"Email and password are required"
            })
         }
         const user = await prisma.user.findUnique({
            where:{email},
         });
         if(!user){
            return res.status(404).json({
                message:"User not found"
            });
         }

         const isMatch = await bcrypt.compare(password, user.password);
         if(!isMatch){
            return res.status(400).json({
                message:"Invaild cerdentials",
            });
         }
         const token = generateToken(user);
         res.status(200).json({
            message:"Login Successful",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            },
         });
    }
    catch(error){
      console.error("Login Error: ", error);
      res.status(500).json({
        message:"Internal server error",
      })
    }
}



// Get all users (Admin only)
exports.getAlluser =  async(req,res)=>{
    try{
       const users = await prisma.user.findMany({
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
            status:true,
        }
       });
       res.json(users);
    }
    catch(error){
    res.status(500).json({message:error.message});
    }
}




// Update user role/status (Admin only)
exports.updateUser = async(req,res)=>{
    try{
     const { id } = req.params;
     const {role,status} = req.body;
     const updatedUser = await prisma.user.update({
        where:{id:Number(id)},
        data:{
            role,
            status,
        }
     });
     res.json({
        message:"User updated successfully",
        updatedUser,
     });
    }
    catch(error){
   res.status(500).json({message:error.message})
    }
};

// Get current logged-in user
exports.getMe = async(req,res)=>{
    try{
     const user = await prisma.user.findUnique({
        where:{id:req.user.id},
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
            status:true
        },
     })
     res.json(user);
    }
    catch(error){
    res.status(500).json({message:error.message});
    }
}

 





