const { DBConnector } = require('../../modules/DBConnector');

class StocksRepository {
    static db = new DBConnector('stocks.json');

    static read() {
        return JSON.parse(this.db.readFile());
    }

    static write(data) {
        this.db.writeFile(data);
    }

    static insert(stock) {
        return this.db.insert(stock);
    }

    static delete(stockId) {
        return this.db.delete(stockId);
    }
}

module.exports = {
    StocksRepository,
};
