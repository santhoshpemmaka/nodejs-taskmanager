const taskManager = require("../models/taskManager");

exports.getallTaskController = async(req,res,next) => {
    try{
        const tasks = await taskManager.find();
        if(!tasks){
            const errors = new Error("No tasks found");
            errors.statusCode(500);
            throw errors;
        }
        res.status(200).json({
            status : "Ok",
            data : tasks
        })
    }
    catch(err) {
        res.status(err.statusCode || 500).json({
            message : err.message
        })
    }   
}

exports.postTaskController = async(req,res,next) => {
    try{
        const {title} = req.body;
        if(!title){
            const errors = new Error("title input is required");
            errors.statusCode = 400;
            throw errors;
        }
        const task = await taskManager.findOne({title : title});
        if(task){
            const errors = new Error("title is already exists");
            errors.statusCode = 400;
            throw errors;
        }
        const newTask = new taskManager({
            title : title
        });
        await newTask.save();
        res.status(200).json({
            message : "Task Manager is created"
        })
    }
    catch(err){
        res.status(err.statusCode || 500).json({
            message : err.message
        })
    }
}

exports.updateTaskController = async(req,res,next) => {
    try{
        const id = req.params.id;
        const taskupdate  = req.body.updateStatus;
        if(!id){
            const errors = new Error("Input ID filed required");
            errors.statusCode = 400;
            throw errors;
        }
        const task = await taskManager.findById({_id : id});
        task.isCompleted = taskupdate;
        await task.save();
        res.status(200).json({
            message: "Task is updated"
        })
    }
    catch(err){
        res.status(err.statusCode || 500).json({
            message : err.message
        })
    }
}   

exports.deleteTaskController = async(req,res,next) => {
    try{
        const id = req.params.id;
        if(!id){
            const errors = new Error("Input ID filed required");
            errors.statusCode = 400;
            throw errors;
        }
        await taskManager.findByIdAndDelete(id);
        res.status(200).json({
            message : "Task is deleted"
        })
    }
    catch(err){
        res.status(err.statusCode || 500).json({
            message : err.message
        })
    }
}