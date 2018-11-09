//1

let obj = {
    name: 'Петр',
    'surname': 'Петров',
    'age': '20 лет'
}

let {
    name = 'Aноним', surname = 'Aнонимов', age = '? лет'
} = obj;


console.log('\nЗадание 1: ')
console.log(name, surname, age);

let obj1 = {};

({
    name = 'Aноним',
    surname = 'Aнонимов',
    age = '? лет'
} = obj1);

console.log(name, surname, age);

//2

let str = 'Молоко';
let count = 0;

for (let char of str) {
    if (char === 'о') count++
}

console.log('\nЗадание 2: ')
console.log(count);

//3

let props = {
    id: 'elem1',
    color: 'red',
    border: '3px solid red',
    font: '15px Arial'
}

function setElemByProps({
    id,
    color = 'blue',
    border = '1px solid red',
    font = '15px Arial'
}) {
    Object.assign(document.getElementById(id).style, {
        color,
        border,
        font
    });
}

window.onload = () => {
    setElemByProps(props);
    setElemByProps({
        id: 'elem2'
    });
}

//4

function createSet(option, ...elements) {
    let result = new Set();
    if (option === 0) {
        elements.map((el) => result.add(el))
    } else {
        elements.map((el) => {
            let remainder = el % 2
            if ((option === 2 && remainder === 0) || (option === 1 && remainder > 0)) {
                result.add(el)
            }
        })
    }
    return result;
}

let arr = [1, 2, 3, 4, 5, 6, 6, 6, 5, 5, 5];

console.log('\nЗадание 3: в html');
console.log('\nЗадание 4: ')
console.log(createSet(0, ...arr));
console.log(createSet(1, ...arr));
console.log(createSet(2, ...arr));

//5

class Person {
    constructor(name, age, sex, profession, socialPosition) {
        Object.assign(this, {
            name,
            '_age': age,
            '_sex': sex,
            profession,
            socialPosition
        })
    }

    growUp() {
        console.log(this.name + ': мне теперь ' + Number(this.age + 1));
        this.age++;
    }

    socialPositionCheck() {
        let socialGapYears = {
            7: 'школьник',
            17: 'студент',
            23: 'работник',
            63: 'пенсионер',
            65: 'пенсионер'
        };
        let socialPosition = socialGapYears[this.age];
        if (socialPosition) {
            if (this.sex === 'м' && this.age > 62 && this.age < 65) return
            this.socialPosition = socialPosition;
            console.log(`${this.name} теперь ${this.socialPosition}`)
        }
    }

    professionCheck() {
        let professionGapYears = [7, 23, 63, 65]
        if (professionGapYears.includes(this.age)) {
            if (this.sex === 'м' && this.age > 62 && this.age < 65) return
            console.log(`${this.name} больше не занимается родом деятельности: ${this.profession}`)
            this.profession = ''
            console.log(`${this.name} нуждается в обновлении рода деятельности`)
        }
    }

    get sex() {
        return this._sex;
    }

    set sex(newValue) {
        console.warn('У нас не предусмотрена смена пола :D')
    }

    get age() {
        return this._age;
    }
    set age(newValue) {
        this._age = newValue;
        this.professionCheck();
        this.socialPositionCheck();
    }

    showInfo() {
        console.log(
            `
Имя: ${this.name}
Пол: ${this.sex}
Возраст: ${this.age}
Род деятельности: ${this.profession}
Социальный класс: ${this.socialPosition}

`)
    }

}

console.log('\nЗадание 5: ')
let person1 = new Person('Павел', 20, 'м', 'вуз', 'студент');
person1.growUp();
person1.growUp();
person1.growUp();
person1.sex = 'ж';
let person2 = new Person('Олег', 63, 'м', 'Altarix', 'работник');
person2.growUp();
person2.growUp();
person2.profession = 'рыбалка';
person2.showInfo();

let person3 = new Person('Маша', 5, 'ж', 'детский сад', 'ребёнок');
person3.growUp();
person3.growUp();
person3.showInfo();