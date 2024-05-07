const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://sumedhrmundewadi:ew8jNImXTcJTGZ7q@cluster-0.6awpqed.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority';

mongoose
    .connect(connectionString, {
        useNewUrlParser : true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(()=>{
    console.log('Connected to the DataBase')
    })
    .catch((err)=>{
        console.log(err);
    })
