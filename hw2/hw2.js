function bind(f, ctx) {
    return function () {
        f.apply(ctx, arguments)
    }
}

const car = {
    model: "Ferarri",
    startEngine: function () {
        console.log(this.model + ": Wroooooom!");
    }
}

const car1 = {
    model: "Arrow Ferarri",
    startEngine: () => {
        console.log(this.model + ": Wroooooom!");
    }
}

setTimeout(() => console.log("\nbind(f, ctx):"), 200);
setTimeout(car.startEngine, 200);
setTimeout(car1.startEngine, 200);
setTimeout(bind(car.startEngine, car), 200);
setTimeout(bind(car1.startEngine, car1), 200);

//Как вывод: Arrow func's как методы объектов = уууупс :D

function parseIntWithCache() {
    const cache = {}
    return function (str) {
        if (!cache[str]) cache[str] = parseInt(str);
        console.log("Cache: ", cache)
        return cache[str];
    };
}

let parser = parseIntWithCache();

console.log("parseIntWithCache():");
console.log(parser("123"));
console.log(parser("223"));
console.log(parser("14"));
console.log(parser("123"));

function getTotalSum() {
    return [].reduce.call(arguments, (res, num) => {
        return res += num
    }, 0)
}

console.log("\ngetTotalSum(): ");
console.log(getTotalSum(1, 2, 3))
console.log(getTotalSum(1, 1, 1))

let extendStringify = (key, value) => {
    if (typeof value === "function") {
        return "/Function(" + value.toString() + ")/";
    }
    return value;
}

function uniDecorator(func) {
    const cache = {};
    return function () {
        let argsSignature = JSON.stringify(arguments, extendStringify);
        if (!cache[argsSignature]) {
            cache[argsSignature] = func.apply(null, arguments);
            console.warn("Cache changed by new entry");
            console.warn(cache);
        }
        return cache[argsSignature];
    }
}

console.log("\nuniDecorator():")

let add = function (a, b) {
    return a + b
};

let decorated = uniDecorator(add);
let decoratedParseInt = uniDecorator(parseInt);

console.log("\nAdd with cache: ");
console.log(decorated(1, 2));
console.log(decorated(1, 3));
console.log(decorated(1, 2));
console.log(decorated(1, 3));
console.log("\nParse Int with cache: ");
console.log(decoratedParseInt("12"));
console.log(decoratedParseInt("12"));
console.log(decoratedParseInt("14"));
console.log(decoratedParseInt("14"));
console.log(decoratedParseInt("13"));
console.log(decoratedParseInt("14"));