// script.js

let currentInput = '';
let operator = '';
let firstOperand = null;

const resultDisplay = document.getElementById('result');
const equalButton = document.getElementById('btn_op_equal'); // Получаем кнопку "="

function updateDisplay() {
    resultDisplay.textContent = currentInput || '0';
}

function clear() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput.length < 10) { // Ограничение на количество цифр
        currentInput += number;
        updateDisplay();
    }
}

function setOperator(op) {
    if (currentInput === '') return; // Ничего не делать, если нет ввода
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        firstOperand = operate(operator, firstOperand, parseFloat(currentInput));
    }
    operator = op;
    currentInput = '';
}

function operate(op, a, b) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            return a / b;
        case '%':
            return a % b;
        default:
            return b;
    }
}

function calculate() {
    if (firstOperand === null || currentInput === '') return;
    currentInput = operate(operator, firstOperand, parseFloat(currentInput)).toString();
    operator = '';
    firstOperand = null;
    updateDisplay();
}

function calculateDiceProbability() {
    const inputNumber = parseInt(currentInput);
    if (inputNumber < 2 || inputNumber > 12) {
        alert("Введите число от 2 до 12");
        return;
    }

    // Вероятности для двух кубиков
    const probabilities = {
        2: 1/36,
        3: 2/36,
        4: 3/36,
        5: 4/36,
        6: 5/36,
        7: 6/36,
        8: 5/36,
        9: 4/36,
        10: 3/36,
        11: 2/36,
        12: 1/36
    };

    const probability = probabilities[inputNumber];
    currentInput = probability.toFixed(4); // Форматируем до 4 знаков после запятой
    updateDisplay();

    // Изменяем цвет кнопки "="
    equalButton.style.backgroundColor = `rgba(252, 192, 0, ${probability})`; // Умножаем на #fc0
}

// Обработчики событий для кнопок
document.getElementById('btn_op_clear').addEventListener('click', clear);
document.getElementById('btn_op_sign').addEventListener('click', () => {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
});
document.getElementById('btn_op_percent').addEventListener('click', () => {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
});
document.getElementById('btn_op_div').addEventListener('click', () => setOperator('/'));
document.getElementById('btn_op_mult').addEventListener('click', () => setOperator('x'));
document.getElementById('btn_op_minus').addEventListener('click', () => setOperator('-'));
document.getElementById('btn_op_plus').addEventListener('click', () => setOperator('+'));
document.getElementById('btn_op_equal').addEventListener('click', calculate);

document.getElementById('btn_op_dice').addEventListener('click', calculateDiceProbability); // Обработчик для кнопки 🎲

for (let i = 0; i <= 9; i++) {
    document.getElementById(`btn_digit_${i}`).addEventListener('click', () => appendNumber(i.toString()));
}

document.getElementById('btn_digit_dot').addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
});
