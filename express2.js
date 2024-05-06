const express = require('express');
const nigga = express();
const path = require('path');

// We should add middle war here or else the server won't start!
nigga.use(express.static('./navbar-app'))
// Here we can create a folder called Common and then transfer all the files that we want and then use static and give the name of the directory as ./common!

nigga.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})

nigga.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './navbar-app/styles.css'))
})

nigga.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './navbar-app/logo.svg'))
})

nigga.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './navbar-app/browser-app.js'))
})

nigga.all('*', (req, res)=>{
    res.status(404).send('<h1>404 Resoursce not Found!</h1>')
})

nigga.listen(port = 5005, ()=>{
    console.log(` Server listnening on the port ${port} `);
})