//iternal/stocks/index.js
const express = require('express');
const { StocksController } = require('./StocksController');

const router = express.Router();

// Обработчик для асинхронных действий с ошибками
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Получение всех акций
router.get('/', asyncHandler(StocksController.findStocks));

// Получение акции по ID
router.get('/:id', asyncHandler(StocksController.findStockById));

// Добавление новой акции
router.post('/', asyncHandler(StocksController.addStock));

// Обновление акции
router.put('/:id', asyncHandler(StocksController.updateStock));

// Удаление акции
router.delete('/:id', asyncHandler(StocksController.deleteStock));

module.exports = router;

