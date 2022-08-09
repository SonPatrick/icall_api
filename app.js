const route = require("./routes/routes");
const port = process.env.PORT || 5000;
const express = require("express");
const cron = require("node-cron");
const helmet = require("helmet");
const morgan = require("morgan");
process.env.TZ = "America/Belem";
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var accessLogStream = fs.createWriteStream(path.join(`${__dirname}/logs`, "access.log"), { flags: "a" });
  
// Define o logger {combined, common , {:id :method :url :response-time}}
app.use(morgan("combined", { stream: accessLogStream }));
  
// Define o cabeçalho de aplicação
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () =>
    console.log(`Rodando o servidor na porta ${port} em ${new Date().toString()}`)
);

app.get("/", (req, res) =>{}

);

app.get("/info", async(req, res) => {
 
});

app.use("/action", route);
