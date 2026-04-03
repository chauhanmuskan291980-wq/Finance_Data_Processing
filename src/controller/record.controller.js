const prisma = require("../config/prisma");

exports.createRecord = async(req,res)=>{
    try{
      const { amount, type, category, date, notes } = req.body;
      if(!amount || !type || !category || !date || !notes){
        return res.status(400).json({message:"Required fields missing"});
      }

      const record = await prisma.record.create({
        data:{
            amount,
            type,
            category,
            date: new Date(date),
            notes,
            createdBy:req.user.id,
        },
      });
      res.status(201).json({
        message:"Recide created",
        record,
      })
    }
    catch(error){
     res.status(500).json({message:error.message});
    }
}

exports.getRecordsBySearch = async(req,res)=>{
    try{
        const { type, category, startDate, endDate } = req.query;
        const filters ={};
        if(type) filters.type = type;
        if(category) filters.category = category;

        if(startDate && endDate){
            filters.date={
                gte:new Date(startDate),
                lte:new Data(endDate)
            };
        }
        const records = await prisma.record.findMany({
            where:filters,
            orderBy:{date:"desc"},
        });
        res.json(records);
    }
    catch(error){
     res.status(500).json({message:error.message});
    }
}

exports.getRecords = async(req,res)=>{
   try{
       const getrecords = await prisma.record.findMany();
       res.status(200).json(getrecords) 
   }
   catch(error){
    res.json({message:error.message})
   }
}

exports.updatedRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // clone body
    const data = { ...req.body };
    if (data.date) {
      data.date = new Date(data.date);
    }

    const updated = await prisma.record.update({
      where: { id: Number(id) },
      data,
    });

    res.json({
      message: "Record updated",
      updated,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteRecord = async(req,res)=>{
    try{
      const {id} = req.params;
      await prisma.record.delete({
        where:{id:Number(id)},
      });
      res.json({message:"Recode deleted"});
    }
    catch(error){
     res.status(500).json({message: error.message})
    }
}