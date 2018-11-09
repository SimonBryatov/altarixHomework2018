const calculator = require('./calculator');
let a = process.argv[2];
let operator = process.argv[3];
let b = process.argv[4];

// '+' - addition
// '-' subtraction
// '//' - division
// '\*' - multiplication

try {
console.log(calculator(a, operator, b));
} catch (err) {
    console.log(err.message);
}