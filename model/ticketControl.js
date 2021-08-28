const path = require('path');
const fs = require('fs')

class Ticket {

  constructor( number, table ){
    this.number = number;
    this.table  = table
  }

}

class TicketControl {

  constructor() {
    this.last   = 0
    this.today  = new Date().getDate()
    this.ticket = []
    this.last4  = []
    this.init()
  }

  get toJSON() {
    return {
      last: this.last,
      today:this.today,
      ticket:this.ticket,
      last4:this.last4
    }
  }

  init() {
    let { last, today, ticket, last4 } = require('../data/data.json')
    
    if( today === this.today ){
      this.last = last
      this.ticket = ticket
      this.last4 = last4

    } else this.saveDB()
  }

  saveDB() {
    const pathJson = path.join( __dirname, '../data/data.json' )
    fs.writeFileSync( pathJson, JSON.stringify( this.toJSON ))

  }
  nextTicket(){
    this.last += 1
    this.ticket.push(new Ticket( this.last, null ))
    this.saveDB()

    return 'Ticket ' + this.ticket[this.ticket.length-1].number
  }

  attend(table) {

    if( this.ticket.length === 0 ) return null

    const ticket = this.ticket.shift()
    ticket.table = table

    this.last4.unshift(ticket)

    if ( this.last4 > 4 ) this.last4.splice(-1,1)

    this.saveDB()
    return ticket
  }
}

module.exports = TicketControl