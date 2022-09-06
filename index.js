const express = require("express");
// websockets
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const routes = require("./routes/index");
const { storeProducts } = require("./controllers/products");
const path = require("path");
const { engine } = require("express-handlebars");
// const pug = require("pug");
// const ejs = require("ejs");
const messages = [];

const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// HANDLEBARS desconmentar linea 17 a 26
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", ".hbs");

// WEBSOCKETS
const connectedServer = httpServer.listen(8080, () =>
  console.log("server http con web socket listen on port 8080")
);
connectedServer.on("error", (error) => {
  console.log("error", error);
});

app.set("views", "./views");

app.use("/api", routes);

app.get("/listProducts", async (_req, res) => {
  return res.render("listProducts", {
    data: storeProducts,
  });
});

app.get("/", (_req, res) => {
  res.render("form", { scriptPath: "./js/main.js" });
});

app.listen(PORT, () => {
  console.log(`APP listen on port: ${PORT}`);
});


io.on("connection", (socket) => {
  socket.emit("getData", storeProducts);
  socket.on("newProduct", (prod) => {
    storeProducts.push(prod);
    io.sockets.emit("updateProducts", storeProducts);
  });
  socket.emit("getMessages", messages);
  socket.on('newMessage', (msg) => {
    messages.push(msg);
    io.sockets.emit("updateMessages", messages);
  });
});



