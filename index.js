// this js file will initialize the project...

// port...
var port = 3000; 
var chatHTMLPage = 'chat.html';
var jsFile = 'chat.js';
var useNormalPage = false;

var njs = {
    fs: require('fs'),
    http: require('http'),
    path: require('path')
}

var npm = {
    express: require('express'),
    app: require('express')(), 
    jsdom: require('jsdom'),
    socket: require('socket.io'),
    piler: require('piler')
}

// node_modules...


// derived...
var defaultView = npm.jsdom.jsdom().defaultView,
    $ = require('jquery')(defaultView),
    $window = $(defaultView),
    server = njs.http.Server(npm.app),
    socketIO = npm.socket(server);

var clientjs = npm.piler.createJSManager();

// js files
///var aaa = require('./SupportFiles/Javascript/paoke.5.0.js');

var socketProp = 'chat message';

// add the use of the 'public' files here...
npm.app.use(npm.express.static(njs.path.join(__dirname, 'public')));

if (useNormalPage) { 
    var routes = require('./routes'),
        pages = require('./pages');
    
    // app = express()...
    npm.app.set('port', process.env.PORT || 3000);
    npm.app.set('views', njs.path.join(__dirname, 'views'));
    npm.app.set('view engine', 'jade');

    npm.app.get('/', routes.index);
    npm.app.get('/about', routes.about);
    npm.app.get('/contact', routes.contact);
    npm.app.get('/chat', routes.chat); 
     
    njs.http.createServer(npm.app).listen(npm.app.get('port'), function () {
        console.log('Express server listening on port ' + npm.app.get('port'));
    });   
} else {
    npm.app.set('port', process.env.PORT || port);
    
    //njs.http.createServer(npm.app).listen(npm.app.get('port'), function (req, res) {
    //   // npm.app.get('/', function (req, res) {
    //        res.sendFile(path.join(__dirname + '/' + chatHTMLPage)); 
    //    //}); 
    //});

    // called once for every HTTP request that's made against that server...
    //npm.app.get('/', function (req, res) {
    //    res.sendFile(path.join(__dirname + '/' + chatHTMLPage));
    //    njs.http.createServer(npm.app).listen(npm.app.get('port'), function () {
    //        console.log('Express server listening on port ' + npm.app.get('port'));
    //    });
    //}); 
    
    npm.app.get('/', function (req, res) {
        //res.sendFile(__dirname + '/' + chatHTMLPage);
        res.sendFile(njs.path.join(__dirname + '/' + chatHTMLPage));
    });
     
    exports.aaaa = socketIO;
    
    socketIO.on('connection', function (socket) { 
        socket.on(socketProp, function (msg) {
            console.log('message: ' + msg); // send to log..
            socketIO.emit(socketProp, msg);
        });
    });
    
    server.listen(port, function () {
        console.log('listening on *:' + port);
        console.log('index.js is the default');
        console.log('index.html is the default page');
        console.log('uses: express and socket.io');
    });

   // npm.app.listen(port);
}


  