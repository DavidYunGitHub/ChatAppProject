const express = require('express')
const app = express()
// const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const path = require('path')
const models = require('./models')
const bcrypt = require('bcrypt')
const session = require('express-session')
const socket = require('socket.io')
const indexRoutes = require('./routes/index')

const PORT = 3000
const VIEWS_PATH = path.join(__dirname, '/views')

app.use(session({
    secret: 'somesecret',
    resave: true,
    saveUninitialized: false
}))

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}))

app.use('/',indexRoutes)

//Glenn's Routes
app.use(require('./routes/platforms.js'))
app.use(require('./routes/pccategories.js'))
app.use(require('./routes/pscategories.js'))
app.use(require('./routes/xboxcategories.js'))

app.use(require('./routes/pcaction.js'))
app.use(require('./routes/pcrpg.js'))
app.use(require('./routes/pcshooter.js'))

app.use(require('./routes/psaction.js'))
app.use(require('./routes/psrpg.js'))
app.use(require('./routes/psshooter.js'))

app.use(require('./routes/xboxaction.js'))
app.use(require('./routes/xboxrpg.js'))
app.use(require('./routes/xboxshooter.js'))
//Glenn's Routes

//Kevin's Routes
// app.use(require('./routes/server.js'))



var server = app.listen(8080, '172.31.29.168', ()=>{
console.log('running')
})

//socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('Made socket connection', socket.id);

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });
});
