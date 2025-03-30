//iternal/stocks/StocksRespositiry
const { DBConnector } = require('../../modules/DBConnector');

class StocksRepository {
    static db = new DBConnector('stocks.json');

    static async read() {
        const data = await this.db.readFile();
        return data;  // Данные уже в формате массива объектов
    }

    static async write(data) {
        await this.db.writeFile(data);
    }

    static async insert(stock) {
        return await this.db.insert(stock);
    }

    static async delete(stockId) {
        return await this.db.delete(stockId);
    }
}

module.exports = {
    StocksRepository,
};

