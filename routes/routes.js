const control = require("../services/control.js");
const express = require("express");
const  router = express.Router();

/* Essa é uma classe responsavel pelo gerenciamento das operacoes no banco de dados com base nas rotas acessadas */

/** OP: 1
 * Rota que invoca o método de carregamento dos nomes das salas
 */
router.get("/carregaNomesSalas", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaNomesSalas());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os nomes das salas.`, err.message);
    next(err);
  }
});

/** OP: 2
 * Rota que invoca o método de carregamento dos nomes das salas e dos alunos da turma
 */
router.get("/carregaAlunosSalas", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaAlunosSalas());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os nomes dos alunos e das salas.`, err.message);
    next(err);
  }
});

/** OP: 3
 * Rota que invoca o método de chamar o aluno
 */
router.post("/chamarAluno", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.chamarAluno(req.body));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao chamar o aluno.`, err.message);
    next(err);
  }
});

/** OP: 4
 * Rota que invoca o método de carregamento dos nomes dos alunos que foram chamados no dia
 */
router.get("/carregarAlunosChamadosDia", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregarAlunosChamadosDia());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados de alunos chamados do dia.`, err.message);
    next(err);
  }
});

/** OP: 5
 * Rota que invoca o método de carregamento dos nomes dos alunos não chamados na turma
 */
router.get("/carregarAlunosNaoChamados/:turma", async function (req, res, next) {
    try {
      res.status(200);
      res.json(await control.carregarAlunosNaoChamados(req.params.turma));
    } catch (err) {
      res.status(404);
      console.error(`Erro ao carregar os dados.`, err.message);
      next(err);
    }
  }
);

/** OP: 6
 * Rota que invoca o método de carregamento dos nomes dos alunos chamados na turma
 */
router.get("/carregaAlunosChamadosTurma/:turma", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaAlunosChamadosTurma(req.params.turma));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

/** OP: 7
 * Rota que invoca o método de carregamento do nome do último aluno chamado de forma geral
 */
 router.get("/carregaUltimoAlunoGeral", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaUltimoAlunoGeral());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

/** OP: 8
 * Rota que invoca o método de carregamento do nome do último aluno chamado de forma geral
 */
router.get("/carregaUltimoAlunoTurma/:turma", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaUltimoAlunoTurma(req.params.turma));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

/** OP: 9
 * Rota que invoca o método de carregamento do nome do aluno falado
 */
router.post("/registraAlunoFalado", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.registraAlunoFalado(req.body.aluno));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

/** OP: 10
 * Rota que invoca o método de carregamento do nome do aluno que não fpoi chamado
 */
router.get("/carregaAlunoNaoFalado/:turma", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaAlunoNaoFalado(req.params.turma));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

/** OP: 11
 * Rota que invoca o método de carregamento do balanço de chamadas geral
 */
router.post("/carregaBalancoDia", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaBalancoDia(req.body.dia));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//Exporta as informacoes
module.exports = router;
