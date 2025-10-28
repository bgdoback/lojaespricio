const { clienteModel } = require("../models/clienteModel");

const clienteController = {
    //.............................
    // listar todos os clientes
    // GET /clientes
    //.............................

    listarClientes: async (req, res) => {
        try {

            const { idCliente } = req.query;

            if (idCliente) {
                if (idCliente.length != 36) {
                    return res.status(400).json({ erro: "id do cliente invalido" });
                }

                const cliente = await clienteModel.buscarUm(idCliente);

                res.status(200).json(cliente);
            }
            const clientes = await clienteModel.buscarTodos();
            res.status(200).json(clientes);
        } catch (error) {
            console.error("Erro ao listar cliente", error);
            res.status(500).json({ message: 'Erro ao buscar cliente' })
        }
    },

    //.............................
    // Criar um novo cliente
    // POST /clientes
    /*
    {
    "nomeCliente": "valor",
    "cpfCliente": "valor"
    }
    */
    //.............................

    criarCliente: async (req, res) => {
        try {

            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == undefined || cpfCliente == undefined) {
                return res.status(400).json({ erro: 'Campos obrigatorios nao preenchidos !' });
            }

            if (clientes.length > 0) {
                return res.status(409).json({ erro: 'CPF ja cadastrado'});
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);

            res.status(201).json({ message: 'Cliente cadastrado com sucesso !' });

        } catch (error) {
            console.error('Erro ao cadastrar cliente', error);
            res.status(500).json({ erro: 'Erro no servidor ao cadastrar cliente' });

        }
    }
}

module.exports = { clienteController };