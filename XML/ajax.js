//XML/ajax.js
import { urlAll } from "./urls.js";  // Используем правильный импорт

class Ajax {
    // Получение данных по GET-запросу
    async get(url, params = {}, callback) {
        const endpoint = urlAll.getEndpoint(url, params);  // Используем getEndpoint для получения URL

        try {
            const response = await fetch(endpoint);  // Используем fetch вместо XMLHttpRequest
            if (!response.ok) {
                throw new Error(`Ошибка с запросом: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();  // Автоматически парсит JSON
            if (callback) callback(data);  // Вызов коллбека, если он передан
            return data;

        } catch (error) {
            throw new Error("Ошибка при выполнении запроса: " + error.message);
        }
    }
}

export const ajax = new Ajax();
