const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    class:{
        type:String,
        require:true
    },
    studentCount:{
        type:Number,
        require:true,
        default:0
    },
    classId:{
        type:Number,
        require:true
    }
})

const Class = mongoose.model("Class",classSchema)
module.exports = Class