// Переменные для хранения состояния калькулятора
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// Элементы DOM
const resultElement = document.getElementById('result');
const themeSwitcher = document.getElementById('theme-switcher');

// Функция для обновления результата на экране
function updateResult() {
    resultElement.innerText = currentOperand || '0';
}

// Функция для добавления цифры
function appendDigit(digit) {
    if (digit === '.' && currentOperand.includes('.')) return; // Проверка на дублирование точки
    currentOperand = currentOperand.toString() + digit.toString();
    updateResult();
}

// Функция для выбора операции
function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

// Функция для вычисления результата
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev)) return;

    if (operation === '/' && current === 0) {
        currentOperand = 'Ошибка'; // Защита от деления на ноль
        updateResult();
        return;
    }

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case 'x':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    // Ограничение длины результата
    if (currentOperand.length > 10) {
        currentOperand = parseFloat(currentOperand).toExponential(2);
    }

    operation = undefined;
    previousOperand = '';
    updateResult();
}

function appendDigit(digit) {
    if (digit === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + digit.toString();

    // Ограничение длины ввода
    if (currentOperand.length > 10) {
        currentOperand = parseFloat(currentOperand).toExponential(2);
    }

    updateResult();
}

// Функция для очистки калькулятора
function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateResult();
}

// Функция для изменения знака числа
function changeSign() {
    currentOperand = (parseFloat(currentOperand) * -1).toString();
    updateResult();
}

// Функция для вычисления процента
function percentage() {
    currentOperand = (parseFloat(currentOperand)) / 100;
    updateResult();
}

// Обработчики событий для кнопок
document.querySelectorAll('.my-btn').forEach(button => {
    button.addEventListener('click', () => {
        if (button.id.startsWith('btn_digit')) {
            appendDigit(button.innerText);
        } else if (button.id.startsWith('btn_op')) {
            if (button.id === 'btn_op_clear') {
                clear();
            } else if (button.id === 'btn_op_sign') {
                changeSign();
            } else if (button.id === 'btn_op_percent') {
                percentage();
            } else if (button.id === 'btn_op_equal') {
                calculate();
            } else {
                chooseOperation(button.innerText);
            }
        }
    });
});

// Переключение темы
themeSwitcher.addEventListener('click', () => {
    const root = document.documentElement;
    const theme = root.getAttribute('data-theme');

    if (theme === 'dark') {
        root.setAttribute('data-theme', 'light');
        themeSwitcher.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        root.setAttribute('data-theme', 'dark');
        themeSwitcher.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// Применение сохраненной темы при загрузке страницы
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeSwitcher.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
});

// Работа калькулятора с клавиатуры
document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key) || event.key === '.') {
        appendDigit(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        chooseOperation(event.key === '*' ? 'x' : event.key);
    } else if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Backspace') {
        currentOperand = currentOperand.slice(0, -1);
        updateResult();
    } else if (event.key === 'Escape') {
        clear();
    }
});
