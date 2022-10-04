import express from "express";
import { getAllProducts, createProduct } from "./controllers/products/index.js";
import { chatRead } from "./controllers/chat/index.js";
import { fileURLToPath } from "url";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import routes from "./routes/index.js";
import path from "path";
import { engine } from "express-handlebars";
import productsDatabase from "./database/productsDatabase.js";
import { options as productOptions } from "./database/options/productOptions.js";

const db = new productsDatabase(productOptions);
// const pug = require("pug");
// const ejs = require("ejs");
const messages = [];

const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

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
  const productos = await db.getAll();
  console.log(productos);
  return res.render("listProducts", {
    data: productos,
  });
});

app.get("/", (_req, res) => {
  res.render("form", { scriptPath: "./js/main.js" });
});

app.listen(PORT, () => {
  console.log(`APP listen on port: ${PORT}`);
});

io.on("connection", async (socket) => {
  const chatINFO = await chatRead();
  socket.emit("getMessages", chatINFO);
  socket.on("newMessage", (msg) => {
    messages.push(msg);
    io.sockets.emit("updateMessages", messages);
  });
});
