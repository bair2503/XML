const { StocksRepository } = require('./StocksRespository');

class StockDAO {
    static findById(id) {
        const stocks = StocksRepository.read();
        return stocks.find(stock => stock.id === id) || null;
    }

    static find() {
        return StocksRepository.read();
    }

    static insert(stock) {
        return StocksRepository.insert(stock);
    }

    static delete(id) {
        return StocksRepository.delete(id);
    }
}

module.exports = {
    StockDAO,
};
