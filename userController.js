const userModel=require('./userModel')

const getAllUser=async(req,res)=>{
  try{
    const user=await userModel.find()

    res.status(200).json({
      status:"success",
      data:user
    })
  } catch(err){
    console.log(err.message)
  }
}

module.exports={getAllUser}