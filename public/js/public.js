console.log('hola')
const socket = io()

socket.on('status',(payload)=>{
  
  const [ ticket1, ticket2, ticket3, ticket4 ] = payload

  const audio = new Audio('./audio/new-ticket.mp3');
  audio.play();


  if( ticket1 ){
      lblTicket1.innerText = 'Ticket ' + ticket1.number;
      lblEscritorio1.innerText = ticket1.table;
  }
  
  if( ticket2 ){
      lblTicket2.innerText = 'Ticket ' + ticket2.number;
      lblEscritorio2.innerText = ticket2.table;
  }
  
  if( ticket3 ){
      lblTicket3.innerText = 'Ticket ' + ticket3.number;
      lblEscritorio3.innerText = ticket3.table;
  }
  
  if( ticket4 ){
      lblTicket4.innerText = 'Ticket ' + ticket4.number;
      lblEscritorio4.innerText = ticket4.table;
  }


})