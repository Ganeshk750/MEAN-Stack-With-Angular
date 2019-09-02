const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config/database');

const authentication = require('./routes/authentication')(router);

///Database
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) =>{
    if(err){
    console.log('Could NOT connect to database: ', err);
    }else{
        console.log('Connected to datbase: '+ config.db);
    }
});

//parse application/x-www-from-urlencode
app.use(bodyParser.urlencoded({extended: false}))
//parse application/json
app.use(bodyParser.json());

////use for client build to access// nd  static dierctory for frontend
app.use(express.static(__dirname + '/client/dist/client'));

  //use for routing//
  app.use('/authentication', authentication);

// connect server to angular Index.html
app.get('*', (req,res) =>{
    //res.send('<h1>Hello World</h1>');
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () =>{
    console.log('Server Listening on port 8080');
});