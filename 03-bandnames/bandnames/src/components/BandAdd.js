import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandAdd = () => {
  
  const [valor, setValor] = useState('')
const {socket} = useContext(SocketContext)


  const onSubmit = (e) => {
    e.preventDefault()

    if (valor.trim().length > 0) { 
      socket.emit('crear-banda', {nombre:valor})
      setValor('') 
    }
  }

  return (
    <>
      <h3>Agregar Banda</h3>
      <br />
      <form onSubmit={onSubmit}>
        <input
          className='form-control'
          placeholder='Nombre de la Banda'
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
    </>
  )
}
