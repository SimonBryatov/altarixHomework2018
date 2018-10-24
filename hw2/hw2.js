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

function uniDecorator() {
    const cache = {};
    return function () {
        let signature = JSON.stringify(arguments, function (key, value) {
            if (typeof value === "function") {
                return "/Function(" + value.toString() + ")/";
            }
            return value;
        });
        if (!cache[signature]) {
            console.warn("Cache changed by new entry");
            cache[signature] = "cached res";
            console.warn(cache);
        }
        return cache[signature];
    }
}

console.log("\nuniDecorator():")
let decorate = uniDecorator();

console.log("Output:", decorate(1, "sdsf", {x: 4}));
console.log("Output:", decorate(1, "sdsf", {x: 4}, {o : "dog", say: function() {return "woof"}}));
console.log("Output:", decorate(1, "sdsf", {x: 4}));
console.log("Output:", decorate(1, "sdsf", {x: 4}));
console.log("Output:", decorate(1, "sdsf", {x: 4}, () => 123));