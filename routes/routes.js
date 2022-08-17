const control = require("../services/control.js");
const express = require("express");
const router = express.Router();

/* Essa é uma classe responsavel pelo gerenciamento das operacoes no banco de dados com base nas rotas acessadas */


router.get("/nomesSalas", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.loadNomesSalas());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//Carrega alunos salas
router.get("/alunosSalas", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.loadAlunosSalas());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//Chama aluno
router.post("/chamarAluno", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.callAlunosSalas(req.body));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//Carrega alunos chamados do dia
router.get("/alunosChamadosDia", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.loadAlunosChamadosDia());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});


//Carrega alunos não chamados do dia
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

//Carrega alunos chamados por turma
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

//Carrega alunos chamados do dia
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

//registra aluno falado
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

//Carrega alunos não chamados da turma
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

//Carrega alunos não chamados da turma
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