// StocksService.js
const fs = require('fs');
const path = require('path');

// Путь к файлу с данными акций
const stocksFilePath = path.join(__dirname, '../../db/stocks.json');

class StocksService {
    static async findStocks(id) {
        try {
            const data = await this.readFromFile();
            if (id) {
                return data.find(stock => stock.id === id) || null;
            }
            return data;
        } catch (error) {
            console.error('Ошибка в findStocks:', error);
            throw new Error(`Ошибка при получении акций: ${error.message}`);
        }
    }

    static async addStock(stock) {
        try {
            const data = await this.readFromFile();
            data.push(stock);
            await this.writeToFile(data);
            return stock;
        } catch (error) {
            console.error('Ошибка в addStock:', error);
            throw new Error(`Ошибка при добавлении акции: ${error.message}`);
        }
    }

    static async updateStock(id, newData) {
        try {
            const data = await this.readFromFile();
            const stockIndex = data.findIndex(stock => stock.id === id);
            if (stockIndex === -1) {
                throw new Error(`Акция с ID ${id} не найдена`);
            }
            data[stockIndex] = { ...data[stockIndex], ...newData };
            await this.writeToFile(data);
            return data[stockIndex];
        } catch (error) {
            console.error('Ошибка в updateStock:', error);
            throw new Error(`Ошибка при обновлении акции: ${error.message}`);
        }
    }

    static async deleteStock(id) {
        try {
            const data = await this.readFromFile();
            const updatedData = data.filter(stock => stock.id !== id);
            if (updatedData.length === data.length) {
                throw new Error(`Акция с ID ${id} не найдена`);
            }
            await this.writeToFile(updatedData);
            return { message: `Акция с ID ${id} успешно удалена` };
        } catch (error) {
            console.error('Ошибка в deleteStock:', error);
            throw new Error(`Ошибка при удалении акции: ${error.message}`);
        }
    }

    // Метод для чтения данных из файла
    static async readFromFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(stocksFilePath, 'utf-8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(data));
            });
        });
    }

    // Метод для записи данных в файл
    static async writeToFile(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(stocksFilePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = {
    StocksService,
};
