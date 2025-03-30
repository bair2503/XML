//iternal/stocks/StocksController.js
const { StocksService } = require('./StocksService');

const getStocksData = () => {
    const filePath = path.join(__dirname, '../db/stocks.json');  // Путь к файлу
    const data = fs.readFileSync(filePath, 'utf-8'); // Чтение файла синхронно
    return JSON.parse(data);  // Преобразуем JSON строку в объект
};

class StocksController {
    static async findStocks(req, res) {
        try {
            const stocks = await StocksService.findStocks();
            res.json(stocks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findStockById(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Некорректный ID' });
            }

            const stock = await StocksService.findStocks(id);
            if (!stock) {
                return res.status(404).json({ message: 'Акция не найдена' });
            }
            res.json(stock);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async addStock(req, res) {
        try {
            const newStock = await StocksService.addStock(req.body);
            res.status(201).json(newStock);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateStock(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Некорректный ID' });
            }

            const updatedStock = await StocksService.updateStock(id, req.body);
            res.json(updatedStock);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteStock(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Некорректный ID' });
            }

            const result = await StocksService.deleteStock(id);
            res.json(result);
        } catch (error) {
            res.status(error.message.includes('не найдена') ? 404 : 500).json({ error: error.message });
        }
    }
}

module.exports = {
    StocksController,
};
