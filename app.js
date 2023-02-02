const express = require('express');
const app = express()
const { Server } = require('socket.io')

const messagesList = []

app.use(express.static('public'))

const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT, () => console.log('Server running on port 8080'))
httpServer.on('error', error => console.log(error))

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log('Nuevo cliente')
    socket.emit('messages', messagesList)

    socket.on('newUserLoged', user => {
        io.sockets.emit('newUser', user)
    })

    socket.on('message', data => {
        messagesList.push(data)
        io.sockets.emit('messages', messagesList)
    })
})