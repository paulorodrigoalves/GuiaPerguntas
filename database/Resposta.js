const sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
  corpo: {
    type: sequelize.TEXT,
    allowNull: false,
  },
  perguntaId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
});

//sincronizando dados com o banco de dados
Resposta.sync({ force: false }).then(() => {});
module.exports = Resposta;
