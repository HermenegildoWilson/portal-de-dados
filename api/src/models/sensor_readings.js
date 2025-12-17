const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "sensor_readings",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            sensor_id: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            temperature: {
                type: DataTypes.REAL,
                allowNull: true,
            },
            humidity: {
                type: DataTypes.REAL,
                allowNull: true,
            },
            pressure: {
                type: DataTypes.REAL,
                allowNull: true,
            },
            altitude: {
                type: DataTypes.REAL,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW, // O Sequelize gera a data e envia no INSERT
            },
        },
        {
            sequelize,
            tableName: "sensor_readings",
            schema: "public",
            timestamps: false,
            underscored: false,
            indexes: [
                {
                    name: "idx_sensor_time",
                    fields: [
                        { name: "sensor_id" },
                        { name: "created_at", order: "DESC" },
                    ],
                },
                {
                    name: "sensor_readings_pkey",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
