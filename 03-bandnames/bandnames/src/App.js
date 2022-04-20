import React, { useEffect, useState } from 'react'

import io from 'socket.io-client'

import { BandAdd } from './components/BandAdd'
import { BandList } from './components/BandList'

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  })
  return socket
}

function App () {
  const [online, setOnline] = useState(false)
  const [socket] = useState(connectSocketServer())
  const [bands, setBands] = useState([])

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  useEffect(() => {
    socket.on('bandList', (bands) => {
      setBands(bands)
    })
  }, [socket])

  return (
    <div className='container'>
      <div className='alert'>
        Service status:

        {
          online
            ? <span className='text-success'> Online</span>
            : <span className='text-danger'> Offline</span>
        }
      </div>

      <h1> BandNames</h1>
      <hr />
      <div className='row'>
        <div className='col-8'>
          <BandList
            data={bands}
          />
        </div>

        <div className='col-4'>
          <BandAdd />
        </div>
      </div>
    </div>
  )
}

export default App
