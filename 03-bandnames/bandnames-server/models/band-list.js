const Band = require('./band')

class BandList {
  constructor () {
    this.bands = [
      new Band('The Rolling Stones'),
      new Band('The Who'),
      new Band('The Doors'),
      new Band('The Cure'),
      new Band('The Police'),
      new Band('The Clash')
    ]
  }

  addBand (name) {
    const newBand = new Band(name)
    this.bands.push(newBand)
    return this.bands
  }

  removeBand (id) {
    this.bands = this.bands.filter(band => band.id !== id)
  }

  getBands () {
    return this.bands
  }

  increaseVotes (id) {
    this.bands = this.bands.map(band => {
      if (band.id === id) {
        band.votes += 1
      }
      return band
    })
  }

  decreaseVotes (id) {
    this.bands = this.bands.map(band => {
      if (band.id === id) {
        band.votes -= 1
      }
      return band
    })
  }

  changeName (id, newName) {
    this.bands = this.bands.map(band => {
      if (band.id === id) {
        band.name = newName
      }
      return band
    })
  }
}

module.exports = BandList
