const express = require('express');
const PORT = 3000
const app = express();
const userList = [];
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', (_req, res) => {
    res.send(userList)
})

app.post('/users', (req, res) => {
    if(!req.body){
        res.send('missing body').sendStatus(400)
    }
    const data = req.body;
    userList.push(data)
    res.send(userList)
})
app.put('/users', (req, res) => {

})
app.patch('/users', (req, res) => {

})

app.delete('/users', (req, res) => {

})

app.listen(PORT, () => console.log('app listen on port:', PORT))
