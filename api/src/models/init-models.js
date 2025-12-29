import { DataTypes } from "sequelize";
import _sensor_readings from "./sensor_readings.js";
import _tokens from "./tokens.js";
import _usuario from "./usuario.js";

export default function initModels(sequelize) {
    var sensor_readings = _sensor_readings(sequelize, DataTypes);
    var tokens = _tokens(sequelize, DataTypes);
    var usuario = _usuario(sequelize, DataTypes);

    tokens.belongsTo(usuario, {
        as: "id_usuario_usuario",
        foreignKey: "id_usuario",
    });
    usuario.hasMany(tokens, { as: "tokens", foreignKey: "id_usuario" });

    return {
        sensor_readings,
        tokens,
        usuario,
    };
}
