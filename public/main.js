// handshake la linea 2
const socket = io.connect();
const inputs = document.getElementById("inp");
const btnSubmit = document.getElementById("submit");
// evento input se ejecuta cuando metes texto en el input
btnSubmit?.addEventListener("click", (e) => {
  const message = {
    name: document.getElementById("name").value,
    message: document.getElementById("message").value,
  };
  // envio el evento al servidor
  socket.emit("new-message", message);
});

socket.on("new-chat-message", (messages) => {
  const html = messages
    .map((message) => {
      return `<div>
			<strong>${message.name}</strong>: <em> ${message.message}</em>
			</div>`;
    })
    .join(" ");
  document.getElementById("chat").innerHTML = html;
});
