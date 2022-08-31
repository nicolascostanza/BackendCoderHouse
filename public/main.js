// handshake la linea 2
const socket = io.connect()
const inputs = document.getElementById('inp')
// evento input se ejecuta cuando metes texto en el input
inputs?.addEventListener('onChange', (e) => {
    // envio al servidor las cosas q ingresa en el input en tiempo real
    socket.emit('mensajeEnviado', e.target.value)
})

// captura el evento con on, para mandar emit
socket.on('mensajesRecibidos', (message) => {
    document.querySelector('p').innerText = message
})



