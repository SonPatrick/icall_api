const route = require("./routes/routes");
const port = process.env.PORT || 5000;
const express = require("express");
process.env.TZ = "America/Belem";
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();

//Definindo o comportamento da API assim como seus componentes
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

//Define o logger {combined, common , {:id :method :url :response-time} }
var accessLogStream = fs.createWriteStream(
  path.join(`${__dirname}/logs`, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

//Define a porta que a aplicacao vai rodar
app.listen(port, () => {
  console.log(`Rodando o servidor na porta ${port}`);
});

//Definindo a rota principal e apontando o gerenciador de rotas da API
app.use("/", route);

//Rota encadeada multi metodos de verificacao que exibe o status da aplicacao
app
  .get("/status", (req, res) =>
    res.json({ status: 1, message: `O serviço está funcionando normalmente` })
  )
  .post("/status", (req, res) =>
    res.json({ status: 1, message: `O serviço está de boas` })
  )
  .put("/status", (req, res) =>
    res.json({ status: 1, message: `O serviço está ok` })
  )
  .delete("/status", (req, res) =>
    res.json({ status: 1, message: `O serviço está normal` })
  )
  .patch("/status", (req, res) =>
    res.json({ status: 1, message: `O serviço está funcionando` })
  );

//Manipulacao de erros
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
