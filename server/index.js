require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

class Server {

  constructor() {

    this.app    = express()
    this.port   = process.env.PORT
    this.server = require('http').createServer(this.app)
    this.io     = require('socket.io')(this.server)

    this.middleware()
    this.socket()
  }

  middleware() {
    this.app.use( cors() )
    this.app.use( morgan('dev') )
    this.app.use( express.static('public') )
  }

  socket() {
    this.io.on( 'connect',require('../socket/controller') )
  }

  listen() {
    this.server.listen( this.port, ()=>{
      console.log(`El servidor esta funcionando en el puerto ${this.port}`)
    } )
  }
}

module.exports = Server;