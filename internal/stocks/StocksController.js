const { StocksService } = require('./StocksService');

class StocksController {
    static findStocks(req, res) {
        try {
            const stocks = StocksService.findStocks();
            res.json(stocks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static findStockById(req, res) {
        try {
            const stock = StocksService.findStocks(Number(req.params.id));
            if (!stock) {
                return res.status(404).json({ message: 'Акция не найдена' });
            }
            res.json(stock);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static addStock(req, res) {
        try {
            const newStock = StocksService.addStock(req.body);
            res.status(201).json(newStock);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static deleteStock(req, res) {
        try {
            const result = StocksService.deleteStock(Number(req.params.id));
            res.json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = {
    StocksController,
};
