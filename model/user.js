
const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
        DisplayName:{
            type:String,
            required:true,
            min:6,
            max:255
        },
        Email:{
            type:String,
            required:true,
            min:6,
            max:255
        },
        Password:{
            type:String,
            required:true,
            min:8,
            max:50
        }
        

})

module.exports=mongoose.model('login_signup',userSchema)