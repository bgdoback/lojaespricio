const { produtoModel } = require("../models/produtoModel");

const produtoController = {
    //.............................
    // listar todos os produtos
    // GET /produtos
    //.............................

    listarProdutos: async (req, res) => {
        try {
            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao listar produto", error);
        res.status(500).json({ message: 'Erro ao buscar produtos' })
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

    criarProdutos: async (req, res)=>{
try {

   const {nomeProduto, precoProduto} = req.body;

   if(nomeProduto == undefined || precoProduto == undefined || isNaN(precoProduto)){
    return res.status(400).json({erro:'Campos obrigatorios nao preenchidos !'});
   }

   await produtoModel.inserirProduto(nomeProduto, precoProduto);

   res.status(201).json({message: 'Produto cadastrado com sucesso !'});
    
} catch (error) {
    console.error('Erro ao cadastrar produto', error);
    res.status(500).json({erro:'Erro no servidor ao cadastrar produto'});
    
}
    }
}

module.exports = {produtoController};