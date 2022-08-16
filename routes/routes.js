const control = require("../services/control.js");
const express = require("express");
const router = express.Router();

/* Essa é uma classe responsavel pelo gerenciamento das operacoes no banco de dados com base nas rotas acessadas */
//?--------------------QUERIES----------------------------------
//CarregaNomesSalas
router.get("/loadNomesSalas", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.loadNomesSalas());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//CarregaAlunosSalas
router.get("/loadAlunosSalas", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.loadAlunosSalas());
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

//CarregaAlunosSalas
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


//?-------------------------------------------------------------

/* Efetua a busca das informações*/
router.post("/search", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.search(req.query.page, req.body));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao carregar os dados.`, err.message);
    next(err);
  }
});

/* POST: Faz login no sistema */
router.post("/login", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.login(req.body));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao efetuar o cadastro.`, err.message);
    next(err);
  }
});

/* POST: Cria um novo cadastro de usuário*/
router.post("/create/user", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.create(req.body));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao efetuar o cadastro do usuário.`, err.message);
    next(err);
  }
});

/* POST: Cria um novo cadastro de viagem*/
router.post("/create/travel", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.createTravel(req.body));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao efetuar o cadastro da viagem.`, err.message);
    next(err);
  }
});

/* PUT: Atualiza as informacoes do cadastro */
router.put("/update/:id", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.update(req.params.id, req.body));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao atualizar dados`, err.message);
    next(err);
  }
});

/* DELETE: Remove as informacoes cadastradas */
router.delete("/delete/:id", async function (req, res, next) {
  try {
    res.status(200);
    res.json(await control.remove(req.params.id));
  } catch (err) {
    res.status(404);
    console.error(`Erro ao remover o registro`, err.message);
    next(err);
  }
});

/* GET: Captura o cep da API da via Cep */
router.get("/cep/:cep", async function (req, res, next) {
  try {
    res.status(200);
    let data = await control.getCep(req.params.cep);
    res.send(data);
  } catch (err) {
    res.status(404);
    console.error(`Erro ao buscar endereço. Verifique os dados e tente novamente.`, err.message);
    next(err);
  }
});

//Exporta as informacoes
module.exports = router;