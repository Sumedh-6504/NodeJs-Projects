const mongoose = require('mongoose');

const TaskSchema =  new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'You must provide a name!'],
        trim:true,
        maxlength: [20, 'name must not be more than 20 characters!']
    }, 
    completed: {
        type: Boolean,
        default: false // This is becasue the task should not be completed by default (it would be if do not provide the validation)
    }
})

module.exports = mongoose.model('Task', TaskSchema);

// Schema, it is as the name suggests that the post request should be in a scheme that is defined above where
// name should be string type, it is required and if not provided then it shows an error mentioning the custom message 'need a name'
// trim: true--> meaning it is used to trim the post request to suitable space!
// maxlength: 20--> meaning that the name should be 20 characters of length!
// All the above ones are called as validators!
// We can add a custom validators by using an array after the colon!