export const mysql = require("serverless-mysql")({
  config: {
    host: "localhost",
    database: "catalogo",
    user: "root",
    password: "12345",
  },
});