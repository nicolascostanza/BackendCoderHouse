const express = require("express");
const routes = require("./routes/index");

const app = express();
// const handlebars = require("express-handlebars");
const { engine } = require("express-handlebars");
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
  res.render("main", {name: 'asddddd'});
});
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`APP listen on port: ${PORT}`);
});


// const express = require('express')
// const routes = require("./routes/index");
// // const { router, productos} = require('./routes/routes')

// // Templates requeridos por el desafio
// const { engine } = require('express-handlebars')
// // const ejs = require('ejs')
// // const pug = require('pug')

// const path = require('path')

// const app = express()
// const PORT = process.env.PORT || 5000

// app.listen(PORT, (req, res) => {
//     console.log('Server on in port: ', PORT)
// })

// // Para utilizar handlebars descomentar las 2 lineas siguientes
// app.engine('.hbs', engine({ extname: '.hbs' }))
// app.set('view engine', '.hbs')

// // Para utilizar ejs descomentar la siguiente linea
// /* app.set('view engine', '.ejs') */

// // Para utilizar pug descomentar la siguiente linea
// /* app.set('view engine', 'pug') */

// app.set('views', path.join(__dirname, 'views'))

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use(express.static(path.join(__dirname, 'public')))

// app.use('/api', routes)

// app.get('/', (req, res) => {
//     res.render('form')
// })

// app.get('/productos', (req, res) => {
//     res.render('prodTable', {lista: productos})
// })