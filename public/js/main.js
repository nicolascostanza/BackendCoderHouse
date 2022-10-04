const socket = io.connect('http://localhost:8080');
const btnSubmitProduct = document.getElementById("submit");
const btnSubmitMessage = document.getElementById("submitMessage");

// PARTE PRODUCTOS
// obtengo la informacion de los productos al cargar
socket.on("getData", (products) => {
  const html = products
    .map((product) => {
      return `
			<div class='d-flex justify-content-between py-2'>
				<p class='text-primary text-center fs-4'>${product.title}</p>
				<p class='text-primary text-rigth fs-4'>${Number(product.price)}</p>
				<img  width="70" height="70" class="rounded img-fluid" src='${
          product.thumbnail
        }' />
			</div>
			`;
    })
    .join(" ");
  document.getElementById("productList").innerHTML = html;
});

// envio producto creado al servidor
btnSubmitProduct?.addEventListener("click", (e) => {
  e.preventDefault();
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("newProduct", product);
});

// escucho cambio de productos agregados por otros usuarios
socket.on("updateProducts", (products) => {
  const html = products
    .map((product) => {
      return `<div class='d-flex justify-content-between py-2'>
			<p class='text-primary text-center  fs-4'>${product.title}</p>
			<p class='text-primary text-center  fs-4'>${Number(product.price)}</p>
			<img  width="70" height="70" class="rounded img-fluid" src='${
        product.thumbnail
      }' />
		</div>`;
    })
    .join(" ");
  document.getElementById("productList").innerHTML = html;
});

// PARTE MENSAJES
// obtengo la informacion de los mensajes ya cargados
socket.on("getMessages", (messages) => {
  const html = messages
    .map((msg) => {
      return `
			<div class='d-flex justify-content-between py-2'>
				<p class='fw-bold text-primary text-center fs-4'>${msg.email}</p>
				<p class='text-primary text-rigth fs-4'>${msg.date}</p>
			</div>
			<div>
				<p>${msg.message}</p>
			</div>
			`;
    })
    .join(" ");
  document.getElementById("chat").innerHTML = html;
});

// envio mensajes al servidor
btnSubmitMessage?.addEventListener("click", (e) => {
  const email = document.getElementById("email").value;
	const errorMessage = document.getElementById("emailError");
  if (email === "") {
    errorMessage.textContent = "* Email is required";
  } else {
    let expReg =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var respuestaExpReg = expReg.test(email);
		if (respuestaExpReg) {
			errorMessage.textContent = "";
			const dateNow = new Date();
      let day = dateNow.getDate();
      if(day < 10){
        day = `0${day}`
      }
      let month = dateNow.getMonth();
      if(month < 10){
        month = `0${month}`
      }
      const year = dateNow.getFullYear();
      const hours = dateNow.getHours();
      const minutes = dateNow.getMinutes();
      const seconds = dateNow.getSeconds();
			const message = {
				email: document.getElementById("email").value,
				date: `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`,
				message: document.getElementById("message").value,
			};
			socket.emit("newMessage", message);
    } else {
			errorMessage.textContent = "Please enter an email valid";
    }
  }
});

// obtengo los mensajes de otros usuarios
socket.on("updateMessages", (messages) => {
  console.log('messages', messages);
  
  const html = messages
    .map((msg) => {
      return `			<div class='d-flex justify-content-between py-2'>
			<p class='text-primary text-center fs-4'>${msg.email}</p>
			<p class='text-rigth fs-4 textDate'>${msg.date}</p>
		</div>
		<div>
			<p class='fst-italic text-success'>${msg.message}</p>
		</div>`;
    })
    .join(" ");
  document.getElementById("chat").innerHTML = html;
});
