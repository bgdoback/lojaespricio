const express = require("express");
const router = express.Router();
const {clienteController} = require("../controllers/clienteController");

// GET /clientes -> Lista todos os clientes
router.get("/clientes", clienteController.listarClientes);

// POST /produtos -> cria um novo cliente
router.post("/clientes", clienteController.criarCliente);

module.exports = {clienteRoutes: router}