const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())

mongoose.connect('mongodb://localhost:27017/xmemeDB',{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("MongoDB Connected")
})


require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))


app.listen(process.env.PORT || 8081,()=>{
    console.log("server started at port 8081")
})