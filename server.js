const express = require('express');
const hbs = require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
        return text.toUpperCase();
});
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now=new Date().toDateString();
    var log=` ${now} : ${req.url} : ${req.method}`;
    fs.appendFileSync('server.log',log + '\n');
    console.log();
    next();
});
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});
app.get('/',(req,res)=>{

   // res.send('<h1>hello world </h1>');

 /*   res.send({
       name:'atik',
       likes:[
           'gg',
           'ez'
       ]
    });*/

     res.render('home.hbs',{
         pageTitle:'Home',
         welcomeMessage:'Welcome Hommy',
     });
});




app.get('/about',(req,res)=>{
    //res.send('about');
    res.render('about.hbs',{
        pageTitle:'About Page',

    });
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});
