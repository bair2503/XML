const fs = require('fs');
const path = require('path');

class DBConnector {
    constructor(filename) {
        this.filePath = path.join(__dirname, '..', 'db', filename);
    }

    readFile() {
        try {
            console.log(`Чтение из файла по пути: ${this.filePath}`);
            if (!fs.existsSync(this.filePath)) {
                return '[]'; // Если файл не найден, возвращаем пустой массив
            }
            return fs.readFileSync(this.filePath, 'utf8');
        } catch (err) {
            console.error(`Ошибка при чтении файла: ${err.message}`);
            throw err;
        }
    }

    writeFile(data) {
        try {
            console.log(`Запись в файл по пути: ${this.filePath}`);
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (err) {
            console.error(`Ошибка при записи в файл: ${err.message}`);
            throw err;
        }
    }

    insert(newStock) {
        const stocks = JSON.parse(this.readFile());
        newStock.id = stocks.length ? stocks[stocks.length - 1].id + 1 : 1; // Генерация ID
        stocks.push(newStock);
        this.writeFile(stocks);
        return newStock;
    }

    delete(stockId) {
        let stocks = JSON.parse(this.readFile());
        const filteredStocks = stocks.filter(stock => stock.id !== stockId);
        if (stocks.length === filteredStocks.length) {
            throw new Error(`Акция с ID ${stockId} не найдена`);
        }
        this.writeFile(filteredStocks);
        return { id: stockId, message: 'Удалено успешно' };
    }
}

module.exports = {
    DBConnector,
};
