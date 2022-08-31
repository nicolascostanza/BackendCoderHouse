const express = require("express");
// los servidores, el de http y el de socket.io, y los renombramos
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

// levanto express (el servidor)
const app = express();
// servidor http le pasamos por parametros la aplicacion q va a estar sirviendo con ese protocolo
const httpServer = new HttpServer(app);
// server con socket.io ---> le pasamos el servidor http como parametro
const io = new IOServer(httpServer);
// los archivos estaticos se hacen en la carpeta public
// para mostrar los archivos estaidos de public
app.use(express.static("public"));
// CADA CLIENTE ES UN SOCKET, PARA SABER CUANDOS SOCKETS HAY
// aca verificamos cuantos hay conectados
io.on("connection", (socket //socket es el usuario //
) => {
  socket.on('mensajeEnviado', (msg) => {
    // io tiene una base de datos interna
    io.sockets.emit('mensajesRecebidos', msg)
  })
});

// handshake, se trata de decir q el servidor esta conectado
const connectedServer = httpServer.listen(8080, () =>
  console.log("server http con web socket listen on port 8080")
);
// el on indica el evento y el primer parametro es el tipo de evento
connectedServer.on("error", (error) => {
  console.log("error", error);
});
