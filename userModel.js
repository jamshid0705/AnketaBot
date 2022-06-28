const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
  name:{
    type:String
  },
  tel:{
    type:String
  },
  location:{
    type:Object
  },
  age:{
    type:String
  },
  programLang:{
    type:String
  },
  university:{
    type:String
  }
})

const User=mongoose.model('userbots',userSchema)
module.exports=User