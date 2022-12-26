const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const classRouter = require("./routes/class")
const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))
app.use("/v1/myClass",classRouter)

mongoose.connect("mongodb://localhost/classes")
    .then(()=>console.log("database is connected"))
    .catch((err)=>console.log(err.message))

app.listen(4000,()=>console.log("server connected"))