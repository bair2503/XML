// main.js
import { MainPage } from './pages/main/index.js'; // Импорт компонента главной страницы

// Получаем элемент, в который будем вставлять содержимое
const root = document.getElementById('root');

// Создаём и рендерим компонент главной страницы
const mainPage = new MainPage(root);
mainPage.render(); // Рендерим страницу
