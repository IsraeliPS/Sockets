const BandList = require('./band-list')
class Sockets {
  constructor (io) {
    this.io = io

    this.bandList = new BandList()
    this.socketEvents()
  }

  socketEvents () {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('Client connected')

      // Emits the band list to the client
      socket.emit('bandList', this.bandList.getBands())


      socket.on('votar-banda', (id) => {
        this.bandList.increaseVotes(id)
        this.io.emit('bandList', this.bandList.getBands())
      })

      socket.on('borrar-banda', (id) => {
        this.bandList.removeBand(id)
        this.io.emit('bandList', this.bandList.getBands())
      })

      socket.on('cambiar-nombre-banda', ({id,nombre}) => {
        this.bandList.changeName(id, nombre)
        this.io.emit('bandList', this.bandList.getBands())
      })

      socket.on('crear-banda', ({nombre}) => {
        this.bandList.addBand(nombre)
        this.io.emit('bandList', this.bandList.getBands())
      })

    })
  }
}

module.exports = Sockets
