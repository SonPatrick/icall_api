const mysql = require("mysql2/promise");
const config = require("../config");

//Classe responsavel pela funcao que cria a conexao e executa as queries
async function query(sql, params) {
  //const connection = await mysql.createConnection(process.env.JAWSDB_URL);
  //const connection = await mysql.createConnection(config.db || config.local);
  const connection = await mysql.createConnection(config.dev);
  const [results] = await connection.execute(sql, params);
  return results;
}

module.exports = { query };
