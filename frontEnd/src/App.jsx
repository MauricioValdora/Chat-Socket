import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io("/")

function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      body: message,
      from: 'me'
    }
    setMessages([...messages, newMessage])

    socket.emit('message', message);

  }

  useEffect(() => {
    socket.on('message', receiveMessage)

    return () => {
      socket.off('message', receiveMessage)
    }
  }, [])

  const receiveMessage = (message) => setMessages((state) => [...state, message])


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Write your message...'
          onChange={(e) => {
            setMessage(e.target.value)
          }}></input>
        <button>Send</button>
      </form>
      <ul>

        {messages.map((msg, i) => (
          <li key={i}>{msg.from} : {msg.body}</li>
        ))}

      </ul>


    </div>
  )
}

export default App