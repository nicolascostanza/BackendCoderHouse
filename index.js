const express = require('express');
const { Router } = express
const app = express();
const PORT = 3000
const personas = Router();
const mascotas = Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const personList = [];
const petList = [];

const validatePerson = (req, res ,next) => {
    const { name, age } = req.body;
    if (!name || !age){
        res.status(400).send('data missing')
    }
    next()
}

const validatePet = (req, res ,next) => {
    const { name, race } = req.body;
    if (!name || !race){
        res.status(400).send('data missing')
    }
    next()
}

personas.get('/', (_req, res) => {
    res.send(personList)
});

personas.post('/', validatePerson, (req, res) =>{
    if(!req.body){
        res.send('nonexistent body')
    }
    const { name, age } = req.body;
    if (!name || !age){
        res.status(400).send('data missing')
    }
    personList.push({name, age});
    res.status(201).send('person created successfully')
});

mascotas.get('/', (_req, res) => {
    res.send(petList)
});

mascotas.post('/',validatePet, (req, res) =>{
    if(!req.body){
        res.send('nonexistent body')
    }
    personList.push({name, race});
    res.status(201).send('pet created successfully')
})

app.use('/personas', personas)
app.use('/mascotas', mascotas)


app.listen(PORT, () => {
    console.log(`app listen on port ${PORT}`);
});
