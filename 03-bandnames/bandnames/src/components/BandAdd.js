import React, { useState } from 'react'

export const BandAdd = () => {
  const [valor, setValor] = useState('')

  const onSubmit = (e) => {
    e.prevendDefault()
    if (valor.trim().length > 0) { setValor('') }
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
