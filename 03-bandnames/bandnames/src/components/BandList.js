import React, { useContext, useEffect, useState } from 'react'

export const BandList = ({ data }) => {
  const [bands, setBands] = useState(data)
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands)
    })
    return () => socket.off('current-bands')
  }, [socket])

  const cambioNombre = (e, id) => {
    const newName = bands.map(band => {
      if (band.id === id) {
        band.name = e.target.value
      }
      return band
    })
    setBands(newName)
  }

  const perdioFoco = (id, nombre) => {
    socket.emit('cambiar-nombre-banda', { id, nombre })
  }

  const votar = (id) => {
    socket.emit('votar-banda', id)
  }

  const borrar = (id) => {
    socket.emit('borrar-banda', id)
  }

  const createRows = () => {
    return (
      bands.map(band => (
        <tr key={band.id}>
          <td>
            <button
              className='btn btn-primary'
              onClick={() => votar(band.id)}
            >+1
            </button>
          </td>
          <td>
            <input
              className='form-control'
              value={band.name}
              onChange={(e) => cambioNombre(e, band.id)}
              onBlur={() => perdioFoco(band.id, band.name)}
            />
          </td>
          <td>
            <h3>{band.votes}</h3>
          </td>
          <td>
            <button
              className='btn btn-danger'
              onClick={() => borrar(band.id)}
            >
              Borrar
            </button>
          </td>
        </tr>
      ))
    )
  }

  return (
    <>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th />
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {createRows()}
        </tbody>
      </table>

    </>
  )
}
