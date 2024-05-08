const Task = require('../models/Task')

const getAlltasks = async(req, res)=>{
    try {
        const tasks = await Task.find({})  /// this means finding and printting all the data inside the json file to the console!
        res.status(200).json({tasks:tasks})
    } catch (error) {
        
    }
}

const createTask = async (req, res)=>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
const getTask = async (req, res)=>{
try {
    const {id:taskID} = req.params
    const oneTask = await Task.findOne({_id:taskID})
    res.status(200).json({oneTask})
    if(!task){
        return res.status(404).json({msg:`There is no task with id : ${taskID}`})
}
} catch (error) {
    res.status(500).json({message: "Not found!"})
}
}
const updateTask = (req, res)=>{
    res.send("Task updated!");
}
const deleteTask = (req, res)=>{
    res.send('Deleted the task!');
}


module.exports = {
    getAlltasks,
    createTask, 
    getTask,
    updateTask,
    deleteTask
}