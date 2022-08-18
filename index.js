const routes = require('./routes/index');
const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`APP listen on port: ${PORT}`);
});