const resultField = document.getElementById("result");

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
    let expression = resultField.value;

    expression = expression.replace(/\^/g, "**");
    
    try {
        expression = expression
            .replace(/sqrt\(([^)]+)\)/g, (_, match) => Math.sqrt(parseFloat(match)))
            .replace(/sin\(([^)]+)\)/g, (_, match) => Math.sin(parseFloat(match)))
            .replace(/cos\(([^)]+)\)/g, (_, match) => Math.cos(parseFloat(match)))
            .replace(/tan\(([^)]+)\)/g, (_, match) => Math.tan(parseFloat(match)));

        resultField.value = eval(expression);
    } catch (e) {
        resultField.value = "Помилка";
    }
}

document.addEventListener("keydown", function(event) {
switch (event.key) {
    case '1': case '2': case '3': case '4': case '5':
    case '6': case '7': case '8': case '9': case '0':
        append(event.key);
        break;
    case '+':
        append('+');
        break;
    case '-':
        append('-');
        break;
    case '*':
        append('*');
        break;
    case '/':
        append('/');
        break;
    case '=': case 'Enter':
        calculate();
        break;
    case 'Escape':
        clearInput();
        break;
    case '^':
        append('^');
        break;
}
});