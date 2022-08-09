//? Segundo Arquivo: Define as variáveis que configuram a execução
const queries = require("../db/queries");
const express = require("express");
const router = express.Router();

//? POST: Verifica a integridade do serviço */
router.use("/routes", async function (req, res, next) {
  try {
    res.send(
      JSON.stringify({
        status: 1,
        message: "O sistema de rotas está funcionando normalmente.",
      })
    );
  } catch (err) {
    res.send(
      JSON.stringify({
        status: 0,
        message: "O sistema de rotas não está funcionando normalmente.",
        error: err,
      })
    );
    next(err);
  }
});

//? Carrega o nome das salas*/
router.get("/nomesSalas", async function (req, res, next) {
  res.send(JSON.stringify(queries.carregarNomesSalas()));
});

//? POST: Faz a chamada da query no Banco de dados do TOTVS - RM pelo gerenciador de execução*/
router.post("/database", async function (req, res, next) {
 
 // try {
 //   res.send(await fun.database(dbQuery.myQuery));
 // } catch (err) {
 //   console.error(`Erro na request do TOTVS RM.`, err.message);
 //   next(err);
 // }
});

// Disponibiliza o método para as outras classes
module.exports = router;
