const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas");
const Resposta = require("./database/Resposta");

//conexao com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexao feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

//Informando para o Express usar o EJS como View engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [
      ["id", "DESC"], //ASC = Crescente ||DESC = decrescente
    ],
  }).then((perguntas) => {
    console.log(perguntas);
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarPergunta", (req, res) => {
  var titulo = req.body.titulo; //bodyParse
  var descricao = req.body.descricao; //bodyParse
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.post("/salvarResposta/:id", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.params.id;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      res.render("pergunta", {
        pergunta: pergunta,
      });
    } else {
      res.redirect("/");
    }
  });
});

app.listen(8080, () => {
  console.log("App rodando!");
});
