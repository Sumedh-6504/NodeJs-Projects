const express = require('express');
const nigga = express();  // calling the module to activate on nigga!

nigga.get('/', (req, res)=>{
    res.send('Home page!');
})

nigga.get('/about', (req, res)=>{
    res.send('About Page!');
})
// Now to send a new 404 source code aerver not found status manually by ourselves... we use the the .all attribute in express
// and then start

nigga.all('*', (req, res)=>{
    res.status(404).send('<h1>404 Resoursce Not Found!</h1>')
})

nigga.listen(port = 5004, ()=>{
    console.log(`Server listening on the port ${port}`)
});
 