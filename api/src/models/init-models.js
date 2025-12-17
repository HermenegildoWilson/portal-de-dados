var DataTypes = require("sequelize").DataTypes;
var _sensor_readings = require("./sensor_readings");
var _tokens = require("./tokens");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var sensor_readings = _sensor_readings(sequelize, DataTypes);
  var tokens = _tokens(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  tokens.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(tokens, { as: "tokens", foreignKey: "id_usuario"});

  return {
    sensor_readings,
    tokens,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
