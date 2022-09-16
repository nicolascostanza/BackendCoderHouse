import knexLib from "knex";

// creamos el cliente
// al crear esta clase podemos ademas de tener el contructor con la configuracion del cliente, tenes metodos para realizar un CRUD

class ClienteSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }

  crearTabla() {
    // es conveniente en crearTabla poner un parametro data y enviarle todos los valroes de las columnas por ahi
    // schema es la estructura del a base de datos
    // primero validamos si existe y sino la creamos
    // .dropTableIfExists() ---> si la tabla existe eliminamela y creamela de nuevo con esto q te mando
    // this.knex.schema.dropTableIfExists("articulos").finally(()=> { // aca adentro va todo lo de abajo // })
    this.knex.schema.dropTableIfExists("articulos").finally(() => {
      return this.knex.schema.createTable("articulos", (table) => {
        // tenes una columna q se autoimcrementa, q se llama id y q es la clave primaria
        table.increments("id").primary();
        // una columna llamada nombre de tipo string, q tiene un maximo de 15 caracteres y q no puede ser nulla
        table.string("nombre", 15).notNullable();
        table.string("codigo", 10).notNullable();
        // columna de nombre precio q es tipo flotante
        table.float("precio");
        // columna de nombre stock q es de tipo entero
        table.integer("stock");
      });
    });
  }

  consultar() {
    // para q traiga todo ponemos select('*')
    return this.knex.select(// aca va todo lo q tenemos q poner para ocnsultar//
    )
  }

  consultarById(id) {
    // aca deberiamos para en el select el id para q lo filtre y traiga solo el q queremos
    return this.knex.select("......")
  }

  insertarDatos(data) {
    // aca agregamos a la tabla, a knex le pasamos el nombre de la tabla
    // insert es la funcion para agregar
    // deberiamos capturar si es success o error
    return this.knex("articulos").insert(data);
  }

  eliminar(id) {}

  actualizar(id) {}

  close() {
    // para cerrar la conexion
    this.knex.destroy();
  }
}

export default ClienteSQL;
