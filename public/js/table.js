
const numberTable = document.querySelector('h1')
const btnAtent    = document.querySelector('button')
const clientNumber = document.querySelector('small')
const alertTable   = document.querySelector('span')

const url = new URLSearchParams( window.location.search );
const socket = io()

if( !url.has('escritorio') ){
  window.location = 'index.html'
  throw new Error('El escritorio es obligatorio')
} 

const table = url.get('escritorio')

numberTable.textContent = table

socket.on('connect',()=>{
  btnAtent.disabled = false
})

socket.on('disconnect',()=>{
  btnAtent.disabled = true
})

socket.on('ticket-pending',(payload)=>{
  const lblPendientes = document.getElementById('lblPendientes')
  lblPendientes.textContent = payload
})

btnAtent.addEventListener('click',()=>{

  socket.emit('atent-ticket',{ table },({ number, ok, msg })=>{
    
    

    if( ok ) clientNumber.textContent = 'Ticket' + number
    else {
      alertTable.textContent   = msg
      clientNumber.textContent = 'Nadie'
    }
  })
})
