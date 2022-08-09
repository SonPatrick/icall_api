require('dotenv').config();
const mysql = require("mysql2/promise");

async function getDatabase(){ 
   
    const connection = await mysql.createConnection({
        user: process.env.username,
        password: process.env.password,
        host: process.env.server,
        //port:3306,
        database: process.env.dbname
    });

    connection.execute(
        'SELECT * FROM `turma`',
        [],
        async function(err, results, fields) {
          console.log(JSON.stringify(results)); // results contains rows returned by server
          console.log(JSON.stringify(fields)); // fields contains extra meta data about results, if available
      
          // If you execute same statement again, it will be picked from a LRU cache
          // which will save query preparation time and give better performance
        });
}
 
module.exports = {getDatabase}