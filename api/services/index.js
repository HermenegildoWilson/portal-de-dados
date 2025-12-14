/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE AUTENTICAÇÃO
 */
const authServices = require("./auth");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE USUARIO
 */
const userServices = require("./user");

module.exports = {
    authServices,
    userServices
};
