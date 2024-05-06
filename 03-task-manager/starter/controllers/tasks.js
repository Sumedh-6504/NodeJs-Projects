const getAlltasks = (req, res)=>{
    res.send('All Items are Here!');
}

const createTask = (req, res)=>{
    res.send("The task is created!");
}
const getTask = (req, res)=>{
    res.send("Getting one task!");
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