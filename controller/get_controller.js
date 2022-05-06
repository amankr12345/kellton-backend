//GET CONTOLLER
const ProductsModel =require('../model/post_model')
const User=require('../model/user')
const joi=require('@hapi/joi')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


exports.showIndex=(req,res)=>{
    res.send("RUNNING NODE APIs")
}

exports.addProducts=(req,res)=>{
    const post=new ProductsModel({
        id:req.body.id,
        title:req.body.title,
        routeName:req.body.routeName,
        items:req.body.items
    })
    post.save()
    .then(
        data=>{
            res.send(data)
        })
        .catch(err=>{res.send(err)})
}

exports.showProducts=(req,res)=>{
    ProductsModel.find()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.status(400).send(err)
    })

}

exports.signUp=async (req,res)=>{
    const emailExist= await User.findOne({Email:req.body.Email})

    if(emailExist){
        res.status(400).send("email id already exist")
        return;
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.Password,salt)

    const user=new User({
        DisplayName:req.body.DisplayName,
        Email:req.body.Email,
        Password:hashedPassword
    })

    try{
        const signUpSchema=joi.object({
            DisplayName:joi.string().min(3).max(255).required(),
            Email:joi.string().min(3).max(255).required().email(),
            Password:joi.string().min(3).max(255).required()

        })
        const {err}=await signUpSchema.validateAsync(req.body)

        if(err){
            res.status(400).send(err.details[0].message)
            return;
        }
        else{
            const saveUser=await user.save()
            res.status(200).send("User created successfully")
        }

    }
    catch(err){
        res.status(500).send(err)

    }
    

}


exports.signIn= async (req,res)=>{
    const user=await User.findOne({Email:req.body.Email})
    if(!user) return res.status(400).send("Inncorect Email Id")
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.Password,salt)

    const validatePassword= await bcrypt.compare(req.body.Password,user.Password)
    if(!validatePassword) return res.status(400).send("Inccorect password")

    try{
        const loginSchema=joi.object({
            Email:joi.string().min(3).max(255).required().email(),
            Password:joi.string().min(3).max(255).required()
        })
        const {err}= await loginSchema.validateAsync(req.body)
        if(err) res.status(400).send(err.details[0].mesage)
        else{
            const token=jwt.sign({id:user._id},process.env.TOKEN_SECRET)
            res.send(token)
            res.send("Logged Successfully")
        }

    }catch(err){
        res.status(500).send(err)

    }

}
exports.getallUsers=async (req,res)=>{
    const allUser=await User.find()
    try{
        res.status(200).send(allUser)

    }catch(err){
        res.status(500).send(err)
    }
}