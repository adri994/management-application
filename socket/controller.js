const TicketControl = require("../model/ticketControl")

const tickets = new TicketControl()

// broadcast es para emitir a todos el mundo

const socketController = (socket) => {

  socket.emit('last-ticket', tickets.last)
  socket.emit('status',tickets.last4)
  socket.emit('ticket-pending',tickets.ticket.length)

  socket.on('next.ticket', (payload, callback) => {

    const next = tickets.nextTicket();
    socket.broadcast.emit('ticket-pending',tickets.ticket.length)
    callback(next)
  })
  socket.on('atent-ticket', ({ table }, callback) => {

    if (!table) {
      return callback({
        ok: false,
        msg: 'El escritorio es obligatorio'
      })
    }

    const ticket = tickets.attend(table)
    

    // el broadcast sirve para que todo lo vean
    socket.broadcast.emit('status',tickets.last4)
    // se pone 2 porque uno le manda a todos y el otro a uno
    socket.emit('ticket-pending',tickets.ticket.length)
    socket.broadcast.emit('ticket-pending',tickets.ticket.length)

    if (!ticket){
      return callback({
        ok: false,
        msg: 'No hay mas mas ticket'
      })
    }
    
    callback({
      ...ticket,
      ok: true
    })
  })


}

module.exports = socketController