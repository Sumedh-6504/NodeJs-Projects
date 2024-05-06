const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./routes/tasks');

app.use(express.json());

app.get('/hello', (req, res)=>{
    res.send("This is a Task Manager App!");
});

app.use('/api/v1/tasks', tasks);
//app.get('/api/v1/tasks') -- get all the tasks!
// app.post('/api/v1/tasks')- create a new task!
// app.get('/api/v1/tasks/:id') - get a single task!
//app.patch('/api/v1/tasks/:id') - update task!
//app.delete('/api/v1/tasks/:id') - delete a task!
app.listen(port, console.log(`Server is listening on the port ${port}`));