//iternal/stocks/StockDAO.js
const { StocksRepository } = require('./StocksRespository');


class StockDAO {
    static async findById(id) {
        const stocks = await StocksRepository.read();
        return stocks.find(stock => stock.id === Number(id)) || null;
    }

    static async find() {
        return await StocksRepository.read();
    }

    static async insert(stock) {
        return await StocksRepository.insert(stock);
    }

    static async update(id, updatedStock) {
        let stocks = await StocksRepository.read();
        const index = stocks.findIndex(stock => stock.id === Number(id));

        if (index === -1) {
            throw new Error(`Акция с ID ${id} не найдена`);
        }

        stocks[index] = { ...stocks[index], ...updatedStock };
        await StocksRepository.write(stocks);
        return stocks[index];
    }

    static async delete(id) {
        let stocks = await StocksRepository.read();
        const index = stocks.findIndex(stock => stock.id === Number(id));

        if (index === -1) {
            throw new Error(`Акция с ID ${id} не найдена`);
        }

        return await StocksRepository.delete(id);
    }
}

module.exports = {
    StockDAO,
};