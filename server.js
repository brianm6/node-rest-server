// require imports packages required by the application
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const HOST = '0.0.0.0';
const PORT = 3000;

// server is a new instance of express (the web app framework)
let server = express();

// Application settings
server.use((req, res, next) => {
    // Globally set Content-Type header for the application
    res.setHeader("Content-Type", "application/json");
    next();
}); 

// Allow server to support differnt body content types (using the bidyParser package)
server.use(bodyParser.text());
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // support url encoded bodies

// cors
// https://www.npmjs.com/package/cors
// https://codesquery.com/enable-cors-nodejs-express-app/
// Simple Usage (Enable All CORS Requests)
server.use(cors());
server.options('*', cors()) // include before other routes

/* Configure server Routes to handle requests from browser */
// The home page 
server.use('/', require('./routes/index'));
server.use('/product', require('./routes/product'));
server.use('/category', require('./routes/category'));
server.use('/user', require('./routes/user'));

// catch 404 and forward to error handler
server.use(function (req, res, next) {
    var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
    err.status = 404;
    next(err);
});

// Start the HTTP server using HOST address and PORT consts defined above
// Lssten for incoming connections
server.listen(PORT, HOST, function() {
    console.log(`Express server listening on http://${HOST}:${PORT}`);
});

// export this as a module, making the server object available when imported.
module.exports = server;