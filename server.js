const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send(`<H1>Welcome to server with Express</H1>`);
});

let visits = 0;
app.get('/visits', (req, res) => {
    res.send(`the quantity of visits is ${++visits}`)
})

app.get("/fyh", (req, res) => {
    const date = new Date();
    res.send(`the date is: ${date}`)
})
app.listen(PORT, () => console.log(`app listen on port ${PORT}`));
