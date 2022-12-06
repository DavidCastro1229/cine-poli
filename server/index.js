const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const http = require('http')
const {Server} = require('socket.io');

//configuracion para webSocket
const app=express();
const server = http.createServer(app);// modulo http usa las configuraciones de express

const io= new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        method:["GET", "POST"]
    }
})


// agregar diirecctiorio para que el app pueda acceder al fornt end desde suu mismo app
const path = require('path')
const root = path.join(__dirname, '../client/build')

// middlewire
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// usa el front end con el mismo puerto
app.use(express.static(root))

// manejador de errores

app.use((err, req, res, next)=>{
    return res.json({
        error: err.message
    })
})

// routes
const rutas=require('./routes/rutas');
app.use(rutas);


//iniciar server
server.listen(process.env.PORT || 4000, ()=>console.log('server activo'));

io.on('connection', (socket=>{

    socket.on('mensaje', (data)=>{
        console.log(data)
       io.emit('chat', data)
    })
    console.log(socket.id)
 }))

