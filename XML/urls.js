//XML/urls.js
export class Urls {
  constructor(baseUrl = 'http://localhost:8000') {  // Убираем зависимость от process.env
    this.baseUrl = baseUrl;
    this.endpoints = {
      main_pics: '/stocks',
    };
  }

  // Метод для получения эндпоинта с возможностью добавления параметров
  getEndpoint(page, params = {}) {
    let endpoint = this.endpoints[page] || `/${page}`;

    // Если параметры переданы, добавляем их как query-строку
    if (Object.keys(params).length) {
      const queryParams = new URLSearchParams(params).toString();
      endpoint = `${endpoint}?${queryParams}`;
    }

    return `${this.baseUrl}${endpoint}`;
  }

  // Метод для динамического добавления новых эндпоинтов
  addEndpoint(name, path) {
    if (this.endpoints[name]) {
      console.warn(`Эндпоинт с именем ${name} уже существует. Перезапись не выполнена.`);
      return;
    }
    this.endpoints[name] = path;
  }
}

export const urlAll = new Urls();
