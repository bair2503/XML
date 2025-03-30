const express = require('express');
const cors = require('cors');
const path = require('path');
const { StocksController } = require('./internal/stocks/StocksController');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());



app.get('/stocks', StocksController.findStocks);
app.get('/stocks/:id', StocksController.findStockById);
app.post('/stocks', StocksController.addStock);
app.put('/stocks/:id', StocksController.updateStock);
app.delete('/stocks/:id', StocksController.deleteStock);

// Указываем, что статические файлы лежат в папке styles
app.use(express.static(path.join(__dirname, '/styles/styles.css')));

// Пример маршрута
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
