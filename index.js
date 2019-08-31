const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) =>{
    if(err){
    console.log('Could NOT connect to database: ', err);
    }else{
        console.log('Connected to datbase: '+ config.db);
    }
});

app.use(express.static(__dirname + '/client/dist/client'));

app.get('*', (req,res) =>{
    //res.send('<h1>Hello World</h1>');
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () =>{
    console.log('Server Listening on port 8080');
});