//import Express
const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const authRoute=require('./routes/auth')
//intialize the application
const app=express()

const port="8080"


//app.use('/',apiroute)

//send the message for your localhost
app.get('/',(req,res)=>{
    res.send('hello the first ecommerce backend response')
})


//launch the ecommerece backend app
app.listen(port,()=>{
    console.log(`Running the ecommerce Backend on port:"http://localhost:${port}/`)
})

dotenv.config()

mongoose.connect(process.env.DB_CONNECT,{UseNewUrlParser:true},
    ()=>{
        console.log("connected to db")
    })

    app.use(express.json(),cors())

    app.use("/api/users",authRoute)