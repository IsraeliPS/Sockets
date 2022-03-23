// Servidor Express
const express = require('express')

const path = require('path')
const app = express()

// Servidor Sockets
const server = require('http').createServer(app)

// configuración del Socket server
const io = require('socket.io')(server)

// desplegar el directorio publico
app.use(express.static(path.join(__dirname, '/public')))

io.on('connection', (socket) => {
  console.log('cliente conectado!')

  socket.emit('mensaje-bienvenida', {
    msg: 'Bienvenido al server',
    fecha: new Date()
  })

  socket.on('mensaje-retorno', (data) => {
    console.log(data)
  })
})

server.listen(3002, () => {
  console.log('Server corriendo')
})
