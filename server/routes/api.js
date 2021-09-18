const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

//const db = "mongodb+srv://nikhil:nik%401234@cluster0.tgxkb.mongodb.net/test"
const db = "mongodb://nikhil:nik%401234@cluster0-shard-00-00.tgxkb.mongodb.net:27017,cluster0-shard-00-01.tgxkb.mongodb.net:27017,cluster0-shard-00-02.tgxkb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-e585d6-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(db,err=>{
    if (err){
        console.error('Error!'+err)
    }
    else{
        console.log('Connected to mongodb')
    }
})

router.post('/register',(req,res)=>{
    console.log(req.body)
    let userData = req.body
    console.log(req.body)
    let user = new User(userData)
    user.save((error,registerdUser)=>{
        if (error){
            console.log(error)
        } else{
            res.status(200).send(registerdUser)
        }
    })
})

router.post('/login',(req,res)=>{
    console.log(req.body)
    let userData = req.body
    User.findOne({email: userData.email},(error,user)=>{
        if (error){
            console.log(error)
        }
        else{
            if(!user){
                res.status(401).send("Invalid Email!")
            }else{
                if (user.password !== userData.password){
                    res.status(401).send("Invalid Password")
                }else{
                    console.log("Worked")
                    res.status(200).send(user)
                }
            }
        }
    })
})
module.exports = router