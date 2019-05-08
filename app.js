var express= require('express');
var app = express();
var server = require('http').createServer(app);
var handlebars = require('express-handlebars');
var path = require('path');
var io = require('socket.io')(server);
var port = process.env.PORT || 7000;

// Register Handlebars view engine
app.engine( 'hbs', handlebars({
  extname: 'hbs'
  // defaultView: 'default',
  // layoutsDir: __dirname + '/views/pages/',
  // partialsDir: __dirname + '/views/partials/'
}));

// Use Handlebars view engine
app.set('view engine', 'hbs');

//Set path for static files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

//Get index page
app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', function(socket){
  console.log('Connected');
  socket.on('disconnect', function(){
    console.log('Disconnected');
  });
});

//Print message
io.on('connection', function(socket){
  socket.on('chat message', function(message){
    io.emit('chat message', message);
  });
});

server.listen(port, function(){
  console.log('Server running on port: ' + port);
});