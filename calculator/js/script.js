const resultField = document.getElementById("result-input");

function append(value) {
    resultField.value += value;
}

function clearInput() {
    resultField.value = "";
}

function appendMathFunction(funcName) {
    resultField.value = funcName + "(" + resultField.value + ")";
}

function calculate() {
    try {
        resultField.value = math.evaluate(resultField.value);
    } catch (e) {
        resultField.value = "Помилка";
    }
}

document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case '1': case '2': case '3': case '4': case '5':
        case '6': case '7': case '8': case '9': case '0':
        case '+': case '-': case '*': case '/': case '^':
            append(event.key);
            break;
        case '=': case 'Enter':
            calculate();
            break;
        case 'Escape':
            clearInput();
            break;
    }
});
