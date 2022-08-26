const express = require("express");
const routes = require("./routes/index");
const { getAllProducts, storeProducts } = require("./controllers/products");
const path = require("path");
const { engine } = require("express-handlebars");
// const pug = require('pug')
const ejs = require("ejs");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// HANDLEBARS
// app.engine(
//   "hbs",
//   engine({
//     extname: ".hbs",
//     defaultLayout: "",
//     layoutsDir: __dirname + "/views/layouts",
//     partialsDir: __dirname + "/views/partials",
//   })
// );
// app.set("view engine", ".hbs");

// PUG
// app.set('view engine', 'pug')

// EJS
app.set("view engine", ".ejs");

app.set("views", "./views");

app.use("/api", routes);

app.get("/listProducts", async (_req, res) => {
  return res.render("listProducts", {
    data: storeProducts,
  });
});

app.get("/", (req, res) => {
  res.render("form", { scriptPath: "./js/main.js" });
});

app.listen(PORT, () => {
  console.log(`APP listen on port: ${PORT}`);
});
