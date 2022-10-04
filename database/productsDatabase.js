import knexLib from "knex";

export default class productsDatabase {
  constructor(config) {
    this.knex = knexLib(config);
  }
  crearTabla() {
    return this.knex.schema.createTable("productos", (table) => {
      table.increments("id").primary();
      table.string("title", 50).notNullable();
      table.integer("price").notNullable();
      table.string("thumbnail").notNullable();
    });
  }

  async saveProduct(product) {
    try {
      return this.knex("productos").insert(product);
    } catch (error) {
      console.error(`El error es: ${error}`);
    }
  }

  async getById(idProduct) {
    try {
      return this.knex("productos")
        .select("id", "title", "price", "thumbnail")
        .where({ id: idProduct });
    } catch (error) {
      console.error(`El error es: ${error}`);
    }
  }

  async getAll() {
    try {
      return this.knex("productos").select("*");
    } catch (error) {
      console.error(`El error es: ${error}`);
    }
  }

  async updateById(idProduct, data) {
    try {
      return this.knex("productos").where({ id: idProduct }).update(data);
    } catch (error) {
      console.error(`El error es: ${error}`);
    }
  }
  async deleteById(idProduct) {
    try {
      return this.knex("productos").where({ id: idProduct }).del();
    } catch (error) {
      console.error(`El error es: ${error}`);
    }
  }

  close() {
    this.knex.destroy();
  }
}
