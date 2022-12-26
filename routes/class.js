const routes = require("express").Router()
const Class = require("../models/class")
const Student = require("../models/student")

routes.get("/",async(req,res)=>{
    try {
        const classEl = await Class.find()
        res.json({
            class:classEl
        })
    } catch (error) {
        res.status(500).json({
            error:"No class available"
        })
    }
})
routes.get("/:myClassId",async(req,res)=>{
    try {
        const classEl = await Class.findOne(
          {classId:req.params.myClassId}
        )
        res.json({
            class:classEl
        })
    } catch (error) {
        res.status(500).json({
            error:"Id not found",
            message:error.message
        })
    }
})
routes.get("/students/:id",async(req,res)=>{
    try {
        const classEl = await Student.find(
          {classId:req.params.id}
        )
        res.json({
            class:classEl
        })
    } catch (error) {
        res.status(500).json({
            error:"Id not found",
            message:error.message
        })
    }
})
routes.get("/students/myClassId/:studentid",async(req,res)=>{
    try {
        const classEl = await Student.findOne(
          {studentId:req.params.studentid}
        )
        res.json({
            class:classEl
        })
    } catch (error) {
        res.status(500).json({
            error:"Id not found",
            message:error.message
        })
    }
})
routes.put("/students/myClassId/:studentid",async(req,res)=>{
    try {
        const classEl = await Student.findByIdAndUpdate(
            {_id:req.params.studentid},
            req.body,
            {new:true}
        )
        res.json({
            class:classEl
        })
    } catch (error) {
        res.status(500).json({
            error:"Id not found",
            message:error.message
        })
    }
})
routes.delete("/students/myClassId/:studentid",async(req,res)=>{
    try {
        const classEl = await Student.findByIdAndDelete(
            {_id:req.params.studentid},
            {new:true}
        )
        res.json({
            class:classEl
        })
    } catch (error) {
        res.status(500).json({
            error:"Id not found",
            message:error.message
        })
    }
})
routes.post("/newstudent",async (req,res)=>{
    try {
        console.log(req.body)
        const {name,classId} = req.body
       let classEl = await Class.findOne({classId:classId})
        if(classEl){
            console.log(classEl)
            classEl.studentCount++
            classEl.save()
            const student = await Student.create(req.body)
            student.studentId = classEl.studentCount
            student.save()
            res.json({
               student,
               classEl,
               message:"True"
            })
        }
        else{
            classEl = Class.create({
                class:`Class ${classId}`,
                studentCount:1,
                classId
            })
            const student = await Student.create(req.body,{new:true})
            student.studentId = 0
            student.save()
            
            res.json({
                student,
                classEl,
                message:"Tfalse"
            })
        }
    } catch (error) {
        res.status(404).json({
            error:error.message
        })
    }
})


module.exports = routes