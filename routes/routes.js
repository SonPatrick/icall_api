const control = require("../services/control.js");
const express = require("express");
const router = express.Router();

/* Essa é uma classe responsavel pelo gerenciamento das operacoes no banco de dados com base nas rotas acessadas */

//? OP: 01 - Carrega os nomes das salas
router.get("/carregaNomesSalas", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaNomesSalas());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//? OP: 02 - Carrega os nomes dos alunos turma
router.get("/carregaAlunosSalas", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaAlunosSalas());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//? OP: 03 - Chama o aluno
router.post("/chamarAluno", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.chamarAluno(req.body));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//? OP: 04 - Carrega alunos chamados do dia
router.get("/carregarAlunosChamadosDia", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregarAlunosChamadosDia());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//? OP: 05 - Carrega alunos não chamados do dia
router.get("/alunosNaoChamados/:turma", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.loadAlunosNaoChamados(req.params.turma));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//? OP: 06 - Carrega alunos chamados por turma
router.get("/alunosChamadosTurma/:turma", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.loadAlunosChamadosTurma(req.params.turma));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//?OP: 07 - Carrega alunos chamados do dia
router.get("/ultimoAluno/:turma", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.loadUltimoAlunoTurma(req.params.turma));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//? OP: 08 - Registra aluno falado
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

//? Op: 08 - Carrega alunos não chamados da turma
router.get("/alunoNaoFalado/:turma", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.carregaAlunoNaoFalado(req.params.turma));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//? OP: 09 - Carrega alunos não chamados da turma
router.post("/balancoDia", async function (req, res, next) {
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
