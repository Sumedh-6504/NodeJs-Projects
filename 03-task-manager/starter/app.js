// Here we use the REST API which is Representational State Transfer API where everyone can access the Interface in a server!

const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./routes/tasks');
const connectDB = require('./database/connect');
require('dotenv').config();
const notFound = require('./middlewares/notFound');
const asyncWrapper = require('./middlewares/async');
const errorHandlerMiddleware = require('./middlewares/error-handler');

//middlewares
app.use(express.static('./public'))
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(asyncWrapper); // this one is an extra imported middleware!
app.use(errorHandlerMiddleware);
//app.get('/api/v1/tasks') -- get all the tasks!
// app.post('/api/v1/tasks')- create a new task!
// app.get('/api/v1/tasks/:id') - get a single task!
//app.patch('/api/v1/tasks/:id') - update task!
//app.delete('/api/v1/tasks/:id') - delete a task!

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on the port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start()