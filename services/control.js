const axios = require("axios").default;
const helper = require("../helper");
const config = require("../config");
var datetime = require("node-datetime");
var dt = datetime.create();
var hoje = new Date();
var today = dt.format('d/m/Y');
var agora = dt.format('H:M:S');

process.env.TZ = "America/Belem";
const db = require("./db");

/* Essa é uma classe de controle de operacoes realizadas no banco de dados */

//SELECT: Carrega todas as informacoes
async function load(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return { data, meta };
}

// Faz o cadastro de uma nova viagem
async function createTravel(model) {
  const result = await db.query(
    `INSERT INTO travel (id_travel, id_agency, price, shipname, city_origin, city_destiny, exit_hour, arrival_hour, exit_day, arrival_day, connections, registered_in) 
    VALUES (NULL, '${model.id_agency}', '${model.price}', '${model.shipname}', '${model.city_origin}', '${model.city_destiny}', '${model.exit_hour}', '${model.arrival_hour}', '${model.exit_day}', '${model.arrival_day}', '${model.connections}', current_timestamp())`
  );

  let status = 0;
  let message =
    "Erro ao cadastrar viagem. Verifique as informações e tente novamente.";
  if (result.affectedRows) {
    status = 1;
    message = "Viagem cadastrada com com sucesso.";
  }
  return { message, status };
}

//SELECT: Busca as informações da viagem
async function search(page = 1, model) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
     FROM travel
     WHERE city_origin LIKE '%${model.origin}%'
     AND city_destiny LIKE '%${model.destiny}%'
     LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return { data, meta };
}

//Faz login do usuário no sistema
async function login(model) {
  const rows = await db.query(
    `SELECT * 
      FROM users 
      WHERE email='${model.email}'
      AND pass='${model.pass}';`
  );
  let status = 0;
  let message =
    "Erro ao entrar no sistema. Verifique seus dados e tente novamente.";
  const data = helper.emptyOrRows(rows);

  if (rows.length > 0) {
    status = 1;
    message = "Login efetuado com sucesso.";
  }
  return { message, status, data };
}

//Cria um novo cadastro
async function create(model) {
  const result = await db.query(
    `INSERT INTO users (id_user, fullname, email, phone, pass, city, registeredIn)
     VALUES (NULL, '${model.fullname}', '${model.email}', '${model.phone}', '${model.pass}', '${model.city}', current_timestamp());`
  );

  let status = 0;
  let message =
    "Erro ao fazer o cadastro. Verifique seus dados e tente novamente.";
  if (result.affectedRows) {
    status = 1;
    message = "Cadastro criado com sucesso.";
  }
  return { message, status };
}

//Atualiza o cadastro
async function update(id, model) {
  const result = await db.query(
    `UPDATE users 
      SET fullname = '${model.fullname}',
          email = '${model.email}' 
      WHERE id_user = ${id};`
  );

  let message = "Erro ao atualizar o cadastro.";
  if (result.affectedRows) {
    message = "Dados atualizados com sucesso.";
  }
  return { message };
}

//Remove o cadastro
async function remove(id) {
  const result = await db.query(`DELETE FROM users WHERE id_user=${id}`);
  let status = 0;
  let message = "Erro ao remover o cadastro";
  if (result.affectedRows) {
    status = 1;
    message = "Cadastro removido com sucesso";
  }
  return { status, message };
}

//Busca os dados do cep informado
async function getCep(cep) {
  let status = 0;
  let message = "Endereço não encontrado.";
  let data = "";

  try {
    let response = await (
      await axios(`https://viacep.com.br/ws/${cep}/json/`)
    ).data;
    if (response) {
      status = 1;
      message = "Endereço encontrado.";
      data = response;
    }
    console.log(data);
  } catch (error) {
    status = 0;
    message = "Erro ao buscar o endereço";
    console.error(error);
  }
  return { status, message, data };
}
//? ---------- QUERIES -----------------------------

async function loadNomesSalas() {
    const rows = await db.query(`SELECT DISTINCT(turma) FROM turma ORDER BY turma ASC`);
    const data = helper.emptyOrRows(rows);   
    return data;
}

async function loadAlunosSalas() {
  let turno = hoje.getHours() <= 13 ? 'M' : 'T';
  let success = 0;
  let message = 'Algo deu errado. Tente novamente';

  const rows = await db.query(`SELECT id, turma, aluno, turno, stts
                              FROM turma
                              WHERE stts = 0
                              AND turno = '${turno}'
                              ORDER BY turma ASC`);
  const data = helper.emptyOrRows(rows);  
  
  if(data.length >= 1) {
      success = 1;
      message = 'Lista de alunos carregada com sucesso.'
  }
  return {success, message, data};
}

async function callAlunosSalas(body) {
  let dt = datetime.create();
  let today = dt.format('d/m/Y');
  let agora = dt.format('H:M:S');

  let turno = hoje.getHours() <= 13 ? 'M' : 'T';
  let success = 0;
  let message = 'Aluno não chamado';

  await db.query(`INSERT INTO chamados (id, aluno, turma, turno, dia, hora, stts) VALUES(NULL, '${body.aluno}' , '${body.turma}', '${turno}', '${today}', '${agora}', 0)`)
  .then(async() => { 
    await db.query(`INSERT INTO backup (id, aluno, turma, turno, dia, hora, stts) VALUES(NULL, '${body.aluno}' , '${body.turma}', '${turno}', '${today}', '${agora}', 0)`)
    .then(async () => {     
      success = 1;
      message = 'Aluno chamado com sucesso.'
    });    
  });

  return {success, message};
}


async function loadAlunosChamadosDia() {
  let dt = datetime.create();
  let today = dt.format('d/m/Y');
  let turno = hoje.getHours() <= 13 ? 'M' : 'T';
  let success = 0;
  let message = 'Algo deu errado. Tente novamente';

  const rows = await db.query(`SELECT id, turma, aluno, turno, stts
                               FROM chamados
                               WHERE dia = '${today}'
                               AND turno = '${turno}'
                               ORDER BY id DESC`);
  const data = helper.emptyOrRows(rows);  
  
  if(data.length >= 1) {
      success = 1;
      message = 'Lista de alunos carregada com sucesso.'
  }
  return {success, message, data};
}
//Torna os modulos disponiveis para as outras salas
module.exports = {
  load,
  create,
  update,
  remove,
  login,
  getCep,
  createTravel,
  search,
  loadNomesSalas,
  loadAlunosSalas,
  callAlunosSalas,
  loadAlunosChamadosDia,
};