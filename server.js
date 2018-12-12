const express = require('express');
const hbs = require('hbs')
const fs = require('fs');

let app = express();

const port = process.env.PORT || 3000
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

hbs.registerHelper('getCurrentYear', () => `top ${new Date().getFullYear()}`)
hbs.registerHelper('upperCase',(text)=>text.toUpperCase())
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs')

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    let log = `${new Date().toDateString()} path:${req.url}`
    console.log(log)
    fs.appendFileSync('server.log',`${log} \n`)
    next();
})


app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        pageHeader: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
        pageHeader:'About Page'
    })
})
app.listen(port,()=>console.log(`we are up on port ${port}`));