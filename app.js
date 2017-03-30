// Imports and Required Dependencies
var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var http = require('http');
var https = require('https');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');

var config = require("./config/appconfig")
var app = express();

mongoose.connect('mongodb://localhost:27017/printing-api');

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

/*app.all("/*", function(req, res, next) {
	//CORS headers
	//res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	//res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	//res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method == 'OPTIONS') {
    	res.status(200).end();
	} else {
		next();
	}
});*/

app.use('/api/v1', require('./routes'));
 
// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.set('http-port', config.httpPort);
app.set('https-port', config.httpsPort);

app.set('view engine', 'ejs');

// Security Options

/*
1. Generate a self-signed certificate-key pair
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out certificate.pem

2. Import them to a keystore (some programs use a keystore)
keytool -importcert -file certificate.pem -keystore my.keystore
*/

var securityOptions = {
    key: fs.readFileSync(config.keyFileLocation),
    cert: fs.readFileSync(config.certificateFileLocation),
    //requestCert: true
};

// .......................................................
// create the secure server (HTTPS)
var secureServer = require('https').createServer(securityOptions, app);
secureServer.listen(app.get('https-port'), function () {
	console.log("Listening on Port %s", app.get('https-port'));	
});

