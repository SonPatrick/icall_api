const helper = require("../helper");
let datetime = require("node-datetime");
let dt = datetime.create();
let hoje = new Date();
let today = dt.format("d/m/Y");
process.env.TZ = "America/Belem";
const db = require("./db");

/** OP: 01
 * Carrega o nome das salas
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregaNomesSalas() {
  const rows = await db.query(`SELECT DISTINCT(turma) FROM turma ORDER BY turma ASC`);
  let data = helper.emptyOrRows(rows);

  if (data.length >= 1) {
    success = 1;
    message = "Lista de salas carregada com sucesso.";
  } else{
    success = 0;
    message = "nenhum resultado a ser carregado.";
  }
  return { success, message, data };
}

/** OP: 02
 * Carrega o nome dos alunos relacionados às suas salas e turnos
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregaAlunosSalas() {
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
  } else{
    success = 0;
    message = "nenhum resultado a ser carregado.";
  }
  return { success, message, results };
}

/** OP: 03
 * Chama o aluno pelo nome
 * @Params body {aluno (String), turma (String)}
 * @returns success (int), message (String), results (Data Rows)
 */
async function chamarAluno(body) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let agora = dt.format("H:M:S");

  let turno = hoje.getHours() <= 13 ? "M" : "T";
  let success = 0;
  let message = "Aluno não chamado";

  await db.query(`INSERT INTO chamados (id, aluno, turma, turno, dia, hora, stts) VALUES(NULL, '${body.aluno}' , '${body.turma}', '${turno}', '${today}', '${agora}', 0)`)
    .then(async () => {
      await db.query(`INSERT INTO backup (id, aluno, turma, turno, dia, hora, stts) VALUES(NULL, '${body.aluno}' , '${body.turma}', '${turno}', '${today}', '${agora}', 0)`
        ).then(async () => {
          success = 1;
          message = "Aluno chamado com sucesso.";
        });
    });
  return { success, message };
}

/** OP: 04
 * Carrega os alunos chamados do dia
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregarAlunosChamadosDia() {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let turno = hoje.getHours() <= 13 ? "M" : "T";
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  const rows = await db.query(`SELECT DISTINCT(aluno), id, turma, turno, stts
                               FROM chamados
                               WHERE dia = '${today}'
                               AND turno = '${turno}'
                               ORDER BY id DESC`);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  }
  return { success, message, results };
}

/** OP: 05
 * Carrega os alunos não chamados por turma
 * @Params body {turma {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregarAlunosNaoChamados(turma) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let turno = hoje.getHours() <= 13 ? "M" : "T";
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  const rows = await db.query(`SELECT id, turma, aluno, turno, stts
                               FROM chamados
                               WHERE dia = '${today}'
                               AND stts = 0
                               AND turno = '${turno}'
                               AND turma = '${turma}'
                               ORDER BY id DESC`);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  } else{
    success = 0;
    message = "nenhum aluno a ser carregado.";
  }
  return { success, message, results };
}

/** OP: 06
 * Carrega os alunos chamados por turma
 * @Params body {turma {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregarAlunosChamadosTurma(turma) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  const rows = await db.query(`SELECT DISTINCT(id), turma, aluno, turno, stts
                               FROM chamados
                               WHERE dia = '${today}'
                               AND turma = '${turma}'
                               ORDER BY id ASC`);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  } else{
    success = 0;
    message = "nenhum resultado a ser carregado.";
  }
  return { success, message, results };
}

/** OP: 07
 * Carrega o último aluno chamado por turma
 * @Params body {turma {String}
 * @returns success (int), message (String), results (Data Rows)
 */
 async function carregaUltimoAlunoGeral(turma) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  const rows = await db.query(`SELECT id, turma, aluno, turno, stts
                               FROM chamados
                               WHERE dia = '${today}'                                                      
                               ORDER BY id DESC
                               LIMIT 1`);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  } else{
    success = 0;
    message = "nenhum resultado a ser carregado.";
  }
  return { success, message, results };
}

/** OP: 07
 * Carrega o último aluno chamado por turma
 * @Params body {turma {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregaUltimoAlunoTurma(turma) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  const rows = await db.query(`SELECT id, turma, aluno, turno, stts
                               FROM chamados
                               WHERE dia = '${today}'
                               AND turma = '${turma}'                             
                               ORDER BY id DESC
                               LIMIT 1`);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  } else{
    success = 0;
    message = "nenhum resultado a ser carregado.";
  }
  return { success, message, results };
}

/**
 * Carrega os alunos não chamados por turma
 * @Params body {aluno {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function registrarAlunoFalado(aluno) {
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

/** OP: 10
 * Carrega o último aluno não falado por turma
 * @Params body {turma {String}
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregarAlunoNaoFalado(turma) {
  let dt = datetime.create();
  let today = dt.format("d/m/Y");
  let success = 0;
  let message = "Algo deu errado. Tente novamente";

  const rows = await db.query(`SELECT id, turma, aluno, turno, stts
                               FROM chamados
                               WHERE dia = '${today}'
                               AND turma = '${turma}'
                               AND stts = 0
                               ORDER BY id DESC`);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  } else{
    success = 0;
    message = "nenhum resultado a ser carregado.";
  }
  return { success, message, results };
}

/** OP: 11
 * Carrega o balanço de chamados do dia
 * @Params dia (String)
 * @returns success (int), message (String), results (Data Rows)
 */
async function carregaBalancoDia(dia = today) {
  let success = 0;
  let message = "Nenhum balanço a ser carregado";

  const rows = await db.query(`SELECT COUNT(id) AS total, dia
                               FROM backup
                               WHERE dia = ${dia}
                               GROUP BY dia
                               ORDER BY dia DESC`);
  const results = helper.emptyOrRows(rows);

  if (results.length >= 1) {
    success = 1;
    message = "Lista de alunos carregada com sucesso.";
  } else {
    success = 0;
    message = "nenhum resultado a ser carregado.";
  }
  return { success, message, results };
}

//Torna os modulos disponiveis para as outras salas
module.exports = {
  carregaNomesSalas,
  carregarAlunosSalas,
  chamarAluno,
  carregarAlunosChamadosDia,
  carregarAlunosNaoChamados,
  carregarAlunosChamadosTurma,
  carregaUltimoAlunoTurma,
  registrarAlunoFalado,
  carregarAlunoNaoFalado,
  carregaBalancoDia,
};
