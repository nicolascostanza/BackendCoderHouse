const express = require("express");
const routes = require("./routes/index");
const path = require('path')
const { engine } = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set('views', './views');
app.set('view engine', '.hbs')


app.get("/", (req, res) => {
  res.render("main", {name: 'asddddd', scriptPath: 'js/main.js'});
});
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`APP listen on port: ${PORT}`);
});