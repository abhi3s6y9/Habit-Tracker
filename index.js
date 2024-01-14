const express = require('express');
const app = express();
const db = require('./config/mongoose');
const port = 8000;

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});
