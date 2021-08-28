
const button = document.querySelector('button')
const loading = document.querySelector('#lblNuevoTicket')

const socket = io()

socket.on('connect',()=>{
  socket.on('last-ticket',(ticket)=>{
    loading.textContent = 'Ticket'+ticket
  })
  
  button.disabled = false
})
socket.on('disconnect',()=>{
  button.disabled = true
})

button.addEventListener('click',()=>{

  socket.emit('next.ticket',null,(ticket)=>{
    loading.textContent = ticket
  })

})
