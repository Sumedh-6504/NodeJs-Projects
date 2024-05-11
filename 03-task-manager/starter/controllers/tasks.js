const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/async')


const getAlltasks = asyncWrapper(async(req, res)=>{

    const tasks = await Task.find({})  /// this means finding and printting all the data inside the json file to the console!
    res.status(200).json({tasks:tasks});//, nbTasks: tasks.length, status:"success"});
    
})

// the above one is a syntactic sugar which helps us to wrap the function without repetition of trycatch code blocks!!

const createTask = async (req, res)=>{
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}
const getTask = async (req, res,)=>{ // add another argument as 'next' to run the below green block of code
try {
    const {id:taskID} = req.params;
    const oneTask = await Task.findOne({_id:taskID});
    res.status(200).json({oneTask});
    if(!task){
        // const error = new Error('Not found');
        // error.status = 404;
        // return next(error);
        return res.status(404).json({msg:`There is no task with id : ${taskID}`});
}
} catch (error) {
    res.status(500).json({message: "Not found!"});
}
}

// Basically all the other middlewares work only if you add asyncWrapper into the other tasks like for createTask, updateTask, and others
// So beware when you open this file after a long time!

const updateTask = async (req, res)=>{
    try {
        const {id: taskID} = req.params;
        const updateTask = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true, runValidators: true
        });  // In this line you will get an error if you do not validate the req.body and also when you give a new input like "test": "success" to the json file... So you have given a newtrue
          // The 1st parameter is for the finding of ID and second is for the updating what we enter into the body in POSTMAN!
          
        if(!updateTask){
            return res.status(404).json({msg:`There is no such id - ${taskID}`});
        }
        res.status(200).json({id: taskID, data: req.body});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}
const deleteTask = async (req, res)=>{
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        if(!task){
            req.status(404).json({msg: `The above task Id ${taskID} does not exist!` });
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(404).json({msg: error});
    }
}


module.exports = {
    getAlltasks,
    createTask, 
    getTask,
    updateTask,
    deleteTask
}