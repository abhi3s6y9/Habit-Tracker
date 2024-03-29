const express = require('express');
const app = express();
const db = require('./config/mongoose');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const port = 8000;


// ------Statics files (js, css, sass, etc) ------ //
app.use(express.static(path.join(__dirname,'./assets')));
// app.use(express.urlencoded()); (Old method)
app.use(bodyParser.urlencoded({extended: false}));

// ----------EJS-----------//
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// ------ EJS layouts ------//
app.use(expressLayout);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// ------Router------------//
app.use('/',require('./routes'));



app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});
