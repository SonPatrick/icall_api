const helper = require("../helper");
let datetime = require("node-datetime");
let dt = datetime.create();
let hoje = new Date();
let today = dt.format("d/m/Y");
process.env.TZ = "America/Belem";
const db = require("./db");

/**
 * Carrega o nome das salas
 * @returns success (int), message (String), results (Data Rows)
 */
async function loadNomesSalas() {
  const rows = await db.query(
    `SELECT DISTINCT(turma) FROM turma ORDER BY turma ASC`
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

/** OP: 2
 * Carrega o nome dos alunos relacionados às suas salas e turnos
 * @returns success (int), message (String), results (Data Rows)
 */
async function loadAlunosSalas() {
  let turno = hoje.getHours() <= 13 ? "M" : "T";
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  let rows = await db.query(`SELECT id, turma, aluno, turno, stts
                              FROM turma
                              WHERE stts = 0
                              AND turno = '${turno}'
                              ORDER BY turma ASC`);
  let results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  }
  return { success, message, results };
}

/**
 * Chama o aluno pelo nome
 * @Params body {aluno (String), turma (String)}
 * @returns success (int), message (String), results (Data Rows)
 */
async function callAlunosSalas(body) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let agora = dt.format("H:M:S");

  let turno = hoje.getHours() <= 13 ? "M" : "T";
  let success = 0;
  let message = "Aluno não chamado";

  let query = `INSERT INTO chamados (id, aluno, turma, turno, dia, hora, stts) VALUES(NULL, '${body.aluno}' , '${body.turma}', '${turno}', '${today}', '${agora}', 0)`;
  let backup = `INSERT INTO backup (id, aluno, turma, turno, dia, hora, stts) VALUES(NULL, '${body.aluno}' , '${body.turma}', '${turno}', '${today}', '${agora}', 0)`;

  await db.query(query).then(async () => {
    await db.query(backup).then(async () => {
      success = 1;
      message = "Aluno chamado com sucesso.";
    });
  });
  return { success, message };
}

/**
 * Carrega os alunos chamados do dia
 * @returns success (int), message (String), results (Data Rows)
 */
async function loadAlunosChamadosDia() {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let turno = hoje.getHours() <= 13 ? "M" : "T";
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  let query = `SELECT id, turma, aluno, turno, stts FROM chamados WHERE dia = '${today}' AND turno = '${turno}' ORDER BY id DESC`;

  const rows = await db.query(query);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  }
  return { success, message, results };
}

/**
 * Carrega os alunos não chamados por turma
 * @Params body {turma {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function loadAlunosNaoChamados(turma) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let turno = hoje.getHours() <= 13 ? "M" : "T";
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  let query = `SELECT id, turma, aluno, turno, stts FROM chamados WHERE dia = '${today}' AND stts = 0 AND turno = '${turno}' AND turma = '${turma}' ORDER BY id DESC`;

  const rows = await db.query(query);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  }
  return { success, message, results };
}

/**
 * Carrega os alunos chamados por turma
 * @Params body {turma {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function loadAlunosChamadosTurma(turma) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  let query = `SELECT DISTINCT(id), turma, aluno, turno, stts FROM chamados WHERE dia = '${today}' AND turma = '${turma}' ORDER BY id ASC`;

  const rows = await db.query(query);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  }
  return { success, message, results };
}

/**
 * Carrega o último aluno chamado por turma
 * @Params body {turma {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function loadUltimoAlunoTurma(turma) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  let query = `SELECT id, turma, aluno, turno, stts FROM chamados WHERE dia = '${today}' AND turma = '${turma}' ORDER BY id DESC LIMIT 1`;

  const rows = await db.query(query);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  }
  return { success, message, results };
}

/**
 * Carrega os alunos não chamados por turma
 * @Params body {aluno {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function registraAlunoFalado(aluno) {
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  await db
    .query(`UPDATE chamados SET stts = 1 WHERE aluno = '${aluno}'`)
    .then(() => {
      success = 1;
      message = "Aluno chamado com sucesso.";
    })
    .catch((e) => {
      success = 0;
      message = `Um erro ocorreu. ${e}`;
    });
  return { success, message };
}

/**
 * Carrega o último aluno não falado por turma
 * @Params body {turma {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregaAlunoNaoFalado(turma) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  let query = `SELECT id, turma, aluno, turno, stts FROM chamados WHERE dia = '${today}' AND turma = '${turma}' AND stts = 0 ORDER BY id DESC`;

  const rows = await db.query(query);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  }
  return { success, message, results };
}

/**
 * Carrega o balanço de chamados do dia
 * @Params dia (String)
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregaBalancoDia(dia = today) {
  let success = 0;
  let message = "Nenhum balanço a ser carregado";

  let query = `SELECT COUNT(id) AS total, dia FROM backup WHERE dia = ${dia} GROUP BY dia ORDER BY dia DESC`;

  const rows = await db.query();
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  }
  return { success, message, results };
}

//Torna os modulos disponiveis para as outras salas
module.exports = {
  loadNomesSalas,
  loadAlunosSalas,
  callAlunosSalas,
  loadAlunosChamadosDia,
  loadAlunosNaoChamados,
  loadAlunosChamadosTurma,
  loadUltimoAlunoTurma,
  registraAlunoFalado,
  carregaAlunoNaoFalado,
  carregaBalancoDia,
};
