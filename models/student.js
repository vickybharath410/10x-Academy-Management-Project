const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    classId:{
        type:Number,
        require:true
    },
    studentId:{
        type:Number,
        require:true,
        default:0
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Class"
    }
})

const Student = mongoose.model("Student",studentSchema)
module.exports = Student