const { StockDAO } = require('./StockDAO');

class StocksService {
    static findStocks(id) {
        if (id !== undefined) {
            return StockDAO.findById(id);
        }
        return StockDAO.find();
    }

    static addStock(stock) {
        return StockDAO.insert(stock);
    }

    static deleteStock(id) {
        return StockDAO.delete(id);
    }
}

module.exports = {
    StocksService,
};
