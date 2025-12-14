var DataTypes = require("sequelize").DataTypes;
var _tokens = require("./tokens");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var tokens = _tokens(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  tokens.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(tokens, { as: "tokens", foreignKey: "id_usuario"});

  return {
    tokens,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
