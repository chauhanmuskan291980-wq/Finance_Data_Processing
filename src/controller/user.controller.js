const prisma = require("../prisma");


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





