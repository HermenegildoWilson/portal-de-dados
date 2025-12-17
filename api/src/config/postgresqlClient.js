const Sequelize = require("sequelize");
const env = require("./env");

/**
 * @description LÓGICA PARA CONECTARMO-NOS AO BANCO DE DADOS E VERIFICARMOS O STATUS DA CONEXÃO
 */
const sequelize = new Sequelize(
  env.database_url,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // ignora certificado autoassinado
      },
    },
    logging: false, // opcional
  }
);

function conectDB() {
    return sequelize
        .authenticate()
        .then(() => {
            console.log(`CONECTADO AO BANCO...`);
            return true;
        })
        .catch((error) => {
            console.log(`ERRO DE CONEXÃO AO BANCO... ${error}`);
            return false;
        });
}

/**
 * @description CONECTAMOS O OBJECTO DE CONEXÃO AO BANCO DE DADOS COM OS MODELS DE ITERAÇÃO COM O BANCO
*/ 
const { initModels } = require("../models/init-models");
function conectModels() {
    return initModels(sequelize);
}

module.exports = { conectDB, conectModels };

//npx sequelize-auto -o "./models" -d plataforma -h localhost -u postgres -p 5432 -x senha -e postgres --schema public