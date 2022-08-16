require('dotenv').config();
//Classe que define a configuracao de acesso ao banco de dados do servidor
const config = {
    db: {
      host: process.env.DB_HOST, //"localhost",
      user: process.env.DB_USER, //"root",
      password: process.env.DB_PASS, //"",
      database: process.env.DB_NAME, //"iboardjs",
    },
  
    local: {
      host: "localhost",
      user: "root",
      password: "",
      database: "iboardjs",
    },
    listPerPage: 10,
  };
  module.exports = config;