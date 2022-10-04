import knexLib from "knex";

export default class ChatDatabase {
  constructor(config) {
    this.knex = knexLib(config);
  }

  async createTableChat() {
    return this.knex.schema.dropTableIfExists("chat").finally(() => {
      return this.knex.schema.createTable("chat", (table) => {
        table.increments("id").primary();
        table.string("date").notNullable();
        table.string("email", 50).notNullable();
        table.string("message").notNullable();
      });
    });
  }

  async getMessages() {
    try {
      return this.knex("chat").select("email", "date", "message");
    } catch (error) {}
  }

  async saveMessage(message) {
    try {
      return this.knex("chat").insert(message);
    } catch (error) {
      console.error(`El error es: ${error}`);
    }
  }
}
