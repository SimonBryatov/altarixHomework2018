module.exports = (a, operator, b) => {
    if (arguments.length < 3) throw new Error("Not enough args");
    a = Number(a);
    b = Number(b);
    if (Number.isNaN(a) || Number.isNaN(b)) throw new Error("Only numbers allowed as arguments")
    switch (operator) {
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "/":
            if (b === 0) throw new Error("Division by zero");
            return a / b;
            break;
        case "*":
            return a * b;
            break;
        default:
            throw new Error("Unknown operator");
    }
}