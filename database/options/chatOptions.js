// export const options = {
//   client: 'sqlite3',
//   connection: {
//     filename: "./database/ecommerce.sqlite"
//   },
//   useNullAsDefault: true
// }

export const options = {
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "coderhouse",
  },
};