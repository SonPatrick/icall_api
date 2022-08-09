var data = new Date();
var con = require( '../db/connection')

var carregarNomesSalas = async () =>{
    turno = data.getHours() <= 13 ? 'M' : 'T';

    var dat = await con.getDatabase();

    console.log(`${dat}`);
    return turno;
}

module.exports = {carregarNomesSalas};