const express = require('express')
const app = express()
const fs = require('fs')

// port
const port = 1500

// setup
app.set('view engine', 'ejs');
app.disable('x-powered-by');
app.disable('etag')

// homepage
app.get('/', (req, res) => {
    res.setHeader('cache-control', 'public, max-age=36000000')
    // this is the main part
    // these are default header chrome use to get script
    if (req.headers['sec-fetch-dest'] == "script" || req.headers['referer'] || req.headers['sec-fetch-mode'] == "no-cors" || req.headers['sec-fetch-site'] == "same-origin") { 
        // read real content
        fs.readFile('./views/realcontent.html', 'utf8', (err,data) => {
            if (err){res.send(err);return;}
            res.send(`function h(){window.location="/nice-try"}console.log(Object.defineProperties(Error(),{toString:{value:function(){Error().stack.includes("toString@")&&h()}},message:{get:function(){h()}}}));` + "document.addEventListener('contextmenu', event => event.preventDefault());document.body.innerHTML = `" + data + '`')
        });

        return;
    }

    res.render('index') 
})

app.get('/nice-try', (req, res) => {
    res.sendStatus(500)
})

app.listen(port)
