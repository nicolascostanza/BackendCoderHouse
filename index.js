// importamos la clase de cliente para empezar a trabajar

import ClienteSQL from "./clienteSQL.js";

// enviarle las opciones al cliente(clase) para q se conecte

const options = {
  //client es el gestor de bases de datos q vamos a usar
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "coderhouse2",
  },
  pool: { min: 0, max: 7 },
};

// creamos una instancia del cliente y le mandamos las options

const sqlClient = new ClienteSQL(options);

// * es mejor en vez de tener muchos .then() usar un try catch y poner awaits a cada metodo q uses
// una vez q se inicio todo bien podemos realizar operaciones de crud
//creamos tabla. Devuelve una promesa asique usamos un then y catch para manejar respuestas
sqlClient
  .crearTabla()
  .then((response) => {
    console.log("tabla creada");
    // una vez creada la tabla, insertamos datos. Los id no los envio pq se asignan solo
    const articulos = [
      {
        nombre: "lambo",
        codigo: "lambo-L1",
        price: 7681237812,
        stock: 2,
      },
      {
        nombre: "porche",
        codigo: "porche-L1",
        price: 2311344,
        stock: 123,
      },
      {
        nombre: "mercedes",
        codigo: "mercedes-L1",
        price: 545645365465,
        stock: 12,
      },
      {
        nombre: "fitito",
        codigo: "fitito-L1",
        price: 55554553,
        stock: 322,
      },
    ];
    return sqlClient.insertarDatos(articulos);
  })
  .then(() => {
    console.log("articulos insertados");
  })
  .catch((err) => {
    console.log("error", err);
  });
