const getAlltasks = (req, res)=>{
    res.send('All Items are Here!');
}

const createTask = (req, res)=>{
    res.send(req.body);
}
const getTask = (req, res)=>{
    res.json({id: req.params.id});
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