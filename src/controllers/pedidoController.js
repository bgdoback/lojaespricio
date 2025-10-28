const { pedidoModel } = require("../models/pedidoModel");
const { clienteModel } = require("../models/clienteModel");
const { produtoModel } = require("../models/produtoModel")

const pedidoController = {

    /**
     * Controlador lista todos os pedidos do banco de dados
     * 
     * 
     * @async
     * @function listarPedidos
     * @param {object} req - Objeto da requisiçao (Recebido do cliente HTTP)
     * @param {object} res - Objeto da resposta (Enviado ao cliente HTTP)
     * @returns {Promise<void>} Retorna uma resPOSTA JSON com a lista de pedidos
     * @throws Mostra no console e retorna o erro 500 se ocorrer falha ao buscar os pedidos
     */
    listarPedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.buscarTodos();

            res.status(200).json(pedidos);
        } catch (error) {
            console.error('Erro ao listar pedidos', error)
            res.status(500).json({ erro: "Erro interno no servidor ao listar pedidos!" });
        }
    },

    criarPedido: async (req, res) => {
        try {

            const { idCliente, dataPedido, statusPagamento, itens } = req.body;

            console.log("HELLO", idCliente)

            if (idCliente == undefined || dataPedido == undefined || statusPagamento == undefined || itens.length < 1) {
                return res.status(400).json({ erro: "Campos obrigatorios nao preenchidos" });
            }

            if (idCliente.length != 36) {
                return res.status(400).json({ erro: "ID do cliente invalido!" })
            }

            const cliente = await clienteModel.buscarUm(idCliente);


            if (!cliente || cliente.length != 1) {
                return res.status(400).json({ erro: "Cliente nao encontrado!" });
            }

            for (const item of itens) {
                const { idProduto, qtdItem } = item;

                if (idProduto == undefined || qtdItem == undefined) {
                    return res.status(400).json({ erro: "Campos obrigatorios nao preenchidos" });
                }

                if (idProduto.length != 36) {
                    return res.status(400).json({ erro: "ID do produto invalido" });

                }

            }

            await pedidoModel.inserirPedido(idCliente, dataPedido, statusPagamento, {itens});
            res.status(201).json({message: "Pedido cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar pedido:", error);
            res.status(500).json({ erro: "Erro interno no servidor ao cadastrar pedido" });
        }
    }

}

module.exports = { pedidoController };