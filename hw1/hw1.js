function calculator(a, b, operator) {
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

//Для ignoreCase лучше использовать regexp
function substringFinder(arr, substr) {
    return arr.reduce((res, el) => {
        if (el.includes(substr)) return ++res;
        else return res;
    }, 0)
}

function valueConverter(value) {
    value = Number(value);
    if (Number.isNaN(value)) throw new Error("Only numbers are allowed as args");
    let res = "";
    let sign = value >= 0 ? "" : "- ";
    value = sign ? value * -1 : value;
    let whole = Math.trunc(value);
    let fract = (Math.round((value - whole) * 100) / 100).toString().match(/[^.]*$/);
    let wholeChunks = whole.toString().split("").reverse().join("")
        .match(/.{1,3}/g).reverse()
        .map((el) => el.split("").reverse().join("")).join(" ");
    res = sign + wholeChunks;
    if (fract > 0) res = res + "," + fract;
    return res;
}

function test(func) {
    try {
        func();
    } catch (err) {
        console.error(err.message);
    }
}

console.log("Calculator tests:");
test(() => console.log(calculator(2, 2, "+")));
test(() => console.log(calculator(1, 0, "/")));
test(() => console.log(calculator(1, "fdsf", "*")));
console.log("Substring tests:")
test(() => console.log(substringFinder(["Коля", "Вася", "Оля", "Толя"], "оля")));
console.log("Value converter tests:");
test(() => console.log(valueConverter("12300.0232")));
test(() => console.log(valueConverter("-34334345350.34324")));
test(() => console.log(valueConverter("0.42")));