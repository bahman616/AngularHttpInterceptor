var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var cors = require('cors');

app.use(cors({origin: 'http://localhost:4200'}));

var routes = require('./routes'); 
routes(app); 

app.listen(port);