const mongoose = require("mongoose");
// esquema q debe ser igual q la collection q tenemos en la base de datos
// los tipos de datos van con la primera letra en mayusculas

const usuariosCollection = "Usuarios";

const usuariosSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  email: { type: String, require: true, max: 30 },

});

const usuarios = mongoose.model(usuariosCollection, usuariosSchema);
module.exports = {usuarios};
