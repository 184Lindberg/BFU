document.addEventListener('DOMContentLoaded', function() {
    const resultDisplay = document.getElementById('result');
    const historyDisplay = document.getElementById('history');
    let currentInput = '';
    let currentOperation = null;
    let isNewInput = false;

    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('[data-op="="]');
    const clearButton = document.querySelector('[data-op="clear"]');
    const sqrtButton = document.querySelector('[data-op="sqrt"]');
    const squareButton = document.querySelector('[data-op="square"]');

    numberButtons.forEach(button => {
        button.addEventListener('click', () => handleNumber(button.getAttribute('data-num')));
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => handleOperator(button.getAttribute('data-op')));
    });

    equalsButton.addEventListener('click', calculate);
    clearButton.addEventListener('click', clear);
    sqrtButton.addEventListener('click', sqrt);
    squareButton.addEventListener('click', square);
    document.addEventListener('keydown', handleKeyboard);

    function handleNumber(number) {
        if (isNewInput) {
            currentInput = number;
            isNewInput = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function handleOperator(operator) {
        if (currentOperation) calculate();
        currentOperation = operator;
        isNewInput = true;
        historyDisplay.textContent += ` ${currentInput} ${operator}`;
    }

    function calculate() {
        if (!currentOperation) return;
        let result;
        const previousInput = parseFloat(resultDisplay.textContent);
        const current = parseFloat(currentInput);
        switch (currentOperation) {
            case '+':
                result = previousInput + current;
                break;
            case '-':
                result = previousInput - current;
                break;
            case '*':
                result = previousInput * current;
                break;
            case '/':
                result = previousInput / current;
                break;
        }
        resultDisplay.textContent = result;
        historyDisplay.textContent += ` ${currentInput} = ${result}\n`;
        currentInput = result.toString();
        currentOperation = null;
        isNewInput = true;
    }

    function clear() {
        currentInput = '';
        currentOperation = null;
        resultDisplay.textContent = '0';
        historyDisplay.textContent = '';
    }

    function sqrt() {
        const result = Math.sqrt(parseFloat(resultDisplay.textContent));
        resultDisplay.textContent = result;
        historyDisplay.textContent += ` √ = ${result}\n`;
        currentInput = result.toString();
    }

    function square() {
        const result = Math.pow(parseFloat(resultDisplay.textContent), 2);
        resultDisplay.textContent = result;
        historyDisplay.textContent += ` ^2 = ${result}\n`;
        currentInput = result.toString();
    }

    function handleKeyboard(event) {
        if (event.key >= 0 && event.key <= 9) {
            handleNumber(event.key);
        } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
            handleOperator(event.key);
        } else if (event.key === 'Enter' || event.key === '=') {
            event.preventDefault();
            calculate();
        } else if (event.key === 'Escape') {
            clear();
        } else if (event.key === 'Backspace') {
            handleDelete();
        }
    }

    function updateDisplay() {
        resultDisplay.textContent = currentInput;
    }
});
