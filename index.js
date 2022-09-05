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
// aca creamos la variable messages, para generar consistencia en memoria
const messages = [];
// aca hacemos el handshake con el cliente
io.on("connection", (socket) => {
  // PERSISTENCIA EN MEMORIA, AL CONECTAR TE PIDE TODO EL HISTORIAL DE MSG
  socket.emit("new-chat-message", messages)
  //capturo el evento recibido desde el front, evento llamado new-message
  socket.on("new-message", (message) => {
    console.log("newmessage", message);
    messages.push(message);
    // este io.sockets.emit  esta dentro de socket.on entonces reenvia a todos menos al q envio el mensaje
    io.sockets.emit("new-chat-message", messages);
  });
});

// handshake, se trata de decir q el servidor esta conectado
const connectedServer = httpServer.listen(8080, () =>
  console.log("server http con web socket listen on port 8080")
);
// el on indica el evento y el primer parametro es el tipo de evento
connectedServer.on("error", (error) => {
  console.log("error", error);
});
