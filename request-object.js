let http = require('http')
const fs = require('fs');

const homePage = fs.readFileSync('./navbar-app/index.html')
const homeStyle = fs.readFileSync('./navbar-app/styles.css')
const imagePage = fs.readFileSync('./navbar-app/logo.svg')
const JSPage = fs.readFileSync('./navbar-app/browser-app.js')


const server = http.createServer(function(req, res){
    //console.log(req)
    //console.log(req.method);
    //console.log(req.url);
    const url = req.url
    console.log(url)
    // home page
    if(url ==='/'){
        res.writeHead(200 , {'content-type': 'text/html'})
        res.write(homePage)
        res.end();
    }

    //about page
    else if(url ==='/about'){
        res.writeHead(200 , {'content-type': 'text/html'})
        res.write('<h1>About Page</h1>')
        res.end();
    }

    //style sheet
    else if(url ==='/styles.css'){
        res.writeHead(200 , {'content-type': 'text/css'})
        res.write(homeStyle)
        res.end();
    }
    // image/logo
    else if(url ==='/logo.svg'){
        res.writeHead(200 , {'content-type': 'image/svg+xml'})
        res.write(imagePage)
        res.end();
    }
    // logic page
    else if(url ==='/browser-app.js'){
        res.writeHead(200 , {'content-type': 'text/javascript'})
        res.write(JSPage)
        res.end();
    }
    // page not found
    else{
        res.writeHead(404 , {'content-type': 'text/html'})
        res.write('<h1>Head Page</h1>')
        res.end();
    }
// Here in writing Header File/Text we should specify the content-type with a colon as 
//text/html or text/plain etc(USe chatgpt for more examples!) - MIME
    
})
server.listen(5001);

//Success!