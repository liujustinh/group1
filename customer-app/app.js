const express = require('express');
const app = express();
const config = require('./config');
const port = config.port;
const http = require('http');

//////////////////////////////
const News = require('./models/news')
const Sports = require('./models/sports')
const mongoose = require('mongoose')
const mongourl = 'mongodb://127.0.0.1:27017/group1';
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: '. error.message)
})
///////////////////////////////

app.set('port', port);
app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs');
app.set('views', './views');

const apiRoutes = require('./routes/apiRoutes');


app.use(express.urlencoded({ extended: true }));

/////// Routes ////////

//Homepage
app.get('/', async (req, res, next) => {
    const newsList = await News.find({}).sort({_id:-1}).limit(4)
    res.render('index', {newsList})
})
//Sports page
app.get('/sports', async (req, res, next) => {
    try {
        const sportsList = await Sports.find({}).sort({_id:-1})
        res.render('sports', {sportsList})
    }
    catch (err) {
        next(err)
    }
})
app.get('/chat', (req, res) => res.render('chat')); // Chat Page
app.get('/contact', (req, res) => res.render('contact',{ errorMsg: null, successMsg: null })); // Contact Us Page
app.get('/about', (req, res) => res.render('about')); // About Us Page
app.use('/api', apiRoutes);


///////Socket Con//////
var server = http.createServer(app);
let io = require('socket.io')().listen(server);
var allClients = {};
connectCounter=0;

io.sockets.on('connection',  (socket) => {
   

    io.sockets.emit("counter",++connectCounter)
    io.sockets.emit('userlist', allClients);
  socket.on('disconnect', function() { 
    
    delete allClients[socket.id]
    connectCounter--;
    io.sockets.emit("counter",connectCounter)
    socket.broadcast.emit('userlist', allClients)
  
  })
  // Set the nickname property for a given client
  socket.on('nick', (nick) => {
      socket.nickname=nick
      allClients[socket.id]=(socket.nickname);
      
      io.sockets.emit('userlist', allClients);
  });

 

  // Relay chat data to all clients
  socket.on('chat', (data) => {
    

          let nickname = !socket.nickname? 'Anonymous' : socket.nickname;

          let payload = {
              message: data.message,
              nick: nickname,
          };

          socket.emit('chat',payload);
          socket.broadcast.emit('chat', payload);
     
  });
});



///////



server.listen(port, ()=>console.log(`Main server running on port ${port}`));