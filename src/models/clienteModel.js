const { sql, getConnection } = require("../config/db");

const clienteModel = {
    buscarTodos: async () => {
        try {

            const pool = await getConnection(); // cria conexao com o BD

            let sql = 'SELECT * FROM Clientes';

            const result = await pool.request().query(sql);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar cliente', error)
            throw error; //passa o erro para o controller tratar
        }
    },
    buscarUm: async (idCliente) => {
        try {
            const pool = await getConnection();

            const querysql = 'SELECT * FROM Clientes WHERE idCliente = @idCliente';

            const result = await pool.request()
                .input('idCliente', sql.UniqueIdentifier, idCliente)
                .query(querysql);

            return result.recordset
        } catch (error) {
            console.error('erro ao buscar o cliente: ', error);
            throw error;
        }
    },

    buscarCpf: async (cpfCliente) => {
        try {
            const pool = await getConnection(); // Cria conexão com o BD

            let querySQL = 'SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente';

            const result = await pool.request()
                .input('cpfCliente', sql.Char(14), cpfCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar cpf:", error);
            throw error; // Passa o erro para o Controller tratar
        }

    },
    inserirCliente: async (nomeCliente, cpfCliente) => {
        try {

            const pool = await getConnection();

            let querysql = 'INSERT INTO Clientes(nomeCliente, cpfCliente) VALUES(@nomeCliente, @cpfCliente)';

            await pool.request()
                .input('nomeCliente', sql.VarChar(100), nomeCliente)
                .input('cpfCliente', sql.Char(14), cpfCliente)
                .query(querysql);

        } catch (error) {
            console.error('Erro ao inserir cliente', error);
            throw error; //Passa o erro para o controller tratar
        }

    }
}

module.exports = { clienteModel }