const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")


//post request for posting memes
router.post('/memes',(req,res)=>{
    const {name,url,caption} = req.body
    if(!name || !url || !caption) return res.json({error:"Please add all fields"})
    User.findOne({name:name,url:url,caption:caption})
    .then((savedData)=>{
        if(savedData) return res.status(409).json({error:"Duplicate data already exists"})

        const user = new User({
            name,
            url,
            caption 
        })
        user.save()
        .then(data=>{
            res.json({id:data._id})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

//get request to fetch all memes
router.get('/memes',(req,res)=>{
    User.find({})
    .then(data=>{
        if(!data){
            return res.json({message:[]})
        }
        else{
            data.reverse();
            return res.json({message:data.slice(0,101)})
        }
    })
    .catch(err=>{
        console.log(err)
    })
})

//get request to fetch single meme
router.get('/memes/:id',(req,res)=>{
    const reqId = req.params.id
    User.findOne({_id:reqId})
    .then(data=>{
        if(!data) {
            return res.status(404).json({error:"Meme not found"})
        }
        else{
            return res.json({message:data})
        }
    })
})

//patch request for editing post
router.post('/memes/:id',(req,res)=>{
    const reqId = req.params.id
    const {url,caption} = req.body
    if(!url || !caption) return res.status(409).json({error:"Please add all fields"})
    User.findByIdAndUpdate(reqId)
    .then(savedData=>{
        savedData.url = url
        savedData.caption = caption
        savedData.save()
        .then(saved=>{
            res.json({url,caption})
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

//delete request for deleting post
router.delete('/memes/delete',(req,res)=>{
    const reqId = req.body.id
    User.findByIdAndDelete(reqId)
    .then(data=>{
        res.json({message:"post deleted"})
    })
    .catch(err=>{
        console.log(err)
    })

})

module.exports = router