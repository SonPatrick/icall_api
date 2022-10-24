require("dotenv").config();
//Classe que define a configuracao de acesso ao banco de dados do servidor
const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },

  local: {
    host: "localhost",
    user: "root",
    password: "",
    database: "",
  },

  dev: {
    host: process.env.DB_HOST_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
  },
  listPerPage: 10,
};
module.exports = config;
