const mongoose = require("mongoose");
const { usuarios } = require("./models/usuarios");

const URL = "mongodb://localhost:27017/nombreDeLaBaseDeDatos";

async function CRUD() {
  try {
    // CONEXION A LA BASE DE DATOS
    const connection = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("database connected");

    console.log("CREATE");
    const usuario = { nombre: "nicolas", email: "email@gmail.com" };
    const schemaUsuario = new usuarios(usuario);
    const savedUser = await schemaUsuario.save();
    console.log("usuario guardado:", savedUser);

    console.log("READ");
    // usuarios es el modelo que declare con mongoose, poniendo {} traemos todo
    const listaUsuarios = await usuarios.find({});
    console.log("usuarios en base de datos:", listaUsuarios);

    console.log("UPDATE");
    // updateMany ACTUALIZA TODOS LOS REGISTROS
    // updateOne ACTUALIZA solo un registros con la condicion
    // le pasamos el primer objeto con la condicion y el segundo con el set y lo q queremos modificar
    const estudiante = usuarios.updateOne(
      { nombre: "nicolas" },
      { $set: { nota: 8 } }
    );
    console.log("actualizado !!!", estudiante);

    console.log('DELETE')
    // importantisimo q tenga una condicion, sino borra toda la collection
    // podemos usar deleteOne o deleteMany
    // $lt ---> less than ----> menor que, en este caso 10
    const estudiantesEliminados = await usuarios.deleteMany({$lt: 10})


  } catch (error) {}
}

CRUD();
