const express = require("express");
const routes = require("./routes/index");
const app = express();
const handlebars = require("express-handlebars");
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("main", { name: "nikitokun" });
});
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`APP listen on port: ${PORT}`);
});
