//DBConnector.js
const fs = require('fs').promises;
const path = require('path');

class DBConnector {
    constructor(filename) {
        this.filePath = path.join(__dirname, '..', 'db', filename);
    }

    async readFile() {
        try {
            console.log(`Чтение из файла по пути: ${this.filePath}`);
            await fs.access(this.filePath).catch(() => fs.writeFile(this.filePath, '[]'));
            return JSON.parse(await fs.readFile(this.filePath, 'utf8'));
        } catch (err) {
            console.error(`Ошибка при чтении файла: ${err.message}`);
            return [];
        }
    }

    async writeFile(data) {
        try {
            console.log(`Запись в файл по пути: ${this.filePath}`);
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (err) {
            console.error(`Ошибка при записи в файл: ${err.message}`);
            throw err;
        }
    }

    async insert(newStock) {
        const stocks = await this.readFile();
        const maxId = stocks.reduce((max, stock) => (stock.id > max ? stock.id : max), 0);
        newStock.id = maxId + 1;
        stocks.push(newStock);
        await this.writeFile(stocks);
        return newStock;
    }

    async delete(stockId) {
        let stocks = await this.readFile();
        const filteredStocks = stocks.filter(stock => stock.id !== stockId);
        if (stocks.length === filteredStocks.length) {
            throw new Error(`Акция с ID ${stockId} не найдена`);
        }
        await this.writeFile(filteredStocks);
        return { id: stockId, message: 'Удалено успешно' };
    }
}

module.exports = {
    DBConnector,
};

