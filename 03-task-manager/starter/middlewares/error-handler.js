const { rawListeners } = require("../models/Task")

const errorHandlerMiddleware = (err, req, res, next)=>{
    return res.status(500).json({msg: `Something Went wrong!.. Try again later!`})
};

module.exports = errorHandlerMiddleware;