const { produtoModel } = require("../models/produtoModel");

const produtoController = {

    //.............................
    // listar todos os produtos
    // GET /produtos
    //.............................

    listarProdutos: async (req, res) => {
        try {
            const { idProduto } = req.query;
            if (idProduto) {
                if (!idProduto ||idProduto.length != 36) {
                    return res.status(400).json({ erro: 'id de produto invalido!' });

                }
                const produto = await produtoModel.buscarUm(idProduto);
                res.status(200).json(produto);
            }
            
            
            const produtos = await produtoModel.buscarTodos();


            res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao listar produto", error);
            res.status(500).json({ message: 'Erro ao buscar produtos' });
        }
    },

    //.............................
    // Criar um novo produto
    // POST /produtos
    /*
    {
    "nomeProduto": "valor",
    "precoProduto": 0.00
    }
    */
    //.............................

    criarProdutos: async (req, res) => {
        try {

            const { nomeProduto, precoProduto } = req.body;

            if (nomeProduto == undefined || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({ erro: 'Campos obrigatorios nao preenchidos !' });
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto);

            res.status(201).json({ message: 'Produto cadastrado com sucesso !' });

        } catch (error) {
            console.error('Erro ao cadastrar produto', error);
            res.status(500).json({ erro: 'Erro no servidor ao cadastrar produto' });

        }
    },

    //.............................
    // ATUALIZAR UM PRODUTO 
    // POST /produtos/idProduto
    // nomeProduto e precoProduto são apcionais 
    /*
        {
        "nomeProduto": "valor",
        "precoProduto": 0.00
        }
    */
    //.............................

    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            const { nomeProduto, precoProduto } = req.body;

            if (idProduto.length != 36) {
                return res.status(400).json({ erro: 'id de produto invalido!' })
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(400).json({ erro: 'Produto não encontrado!' });
            }

            const produtoAtual = produto[0];

            const nomeAtuliazado = nomeProduto ?? produtoAtual.nomeProduto;

            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtuliazado, precoAtualizado);

            res.status(200).json({ message: 'Produto atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ erro: 'Erro no servidor ao atualizar produto.' });
        }
    },

    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;

            if (idProduto.length != 36) {
                return res.status(400).json({ erro: 'id de produto invalido!' });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(400).json({ erro: 'Produto não encontrado!' });
            }

            await produtoModel.deletarProduto(idProduto);

            res.status(200).json({ message: "Produto deletado com sucesso!" })

        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({erro:"Erro no servidor ao deletar o produto."});
        }
    }
}

module.exports = { produtoController };