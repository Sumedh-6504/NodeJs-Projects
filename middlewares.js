const express = require('express');
const app = express();

// app.use should be placed here so that we could activate it for all the get functions!!.
// app.use(express.static('./public)) --> here we gave a global middleware usage by express.static('./public) which is a folder!! and has all the function JS files!
const logger = ((req, res, next)=>{
    const method = req.method;
    const url = req.url;
    const time = new Date().getDate()
    console.log(method, url, time);
    next();
})
app.get('/', logger ,(req, res)=>{
    res.send('Home Page!')
})
app.get('/about', logger ,(req, res)=>{
    res.send('About');
})

app.listen(5007, ()=>{
    console.log("Server is listening in the server 5006....");
});
// Here we can use multiple middlewares as functions for all the app.get's by using a code line called... 
// app.use([logger, authorize])... here logger and authorize are two middlewares or functions which are used simultaneously using an array format!