export const mysql = require("serverless-mysql")({
  config: {
    host: process.env.SERVER,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});
