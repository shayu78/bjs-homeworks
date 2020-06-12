"use strict";

function getResult(a, b, c) {
    let discriminant = b ** 2 - 4 * a * c;
    let x = [];

    if (discriminant === 0) {
        x.push(-b / (2 * a));
    } else if (discriminant > 0) {
        x.push((-b + Math.sqrt(discriminant)) / (2 * a));
        x.push((-b - Math.sqrt(discriminant)) / (2 * a));
    }

    return x;
}

function getAverageMark(marks) {
    let averageMark = 0;
    let countMarks = marks.length;
    if (countMarks === 0) return averageMark;
    if (countMarks > 5) {
        alert('Количество оценок больше допустимого. Оставляем первые пять');
        marks = marks.slice(0, 5);
        countMarks = 5;
    }
    averageMark = marks.reduce(function (averageMark, currentValue) {
        return averageMark + currentValue;
    }, averageMark) / countMarks;

    return averageMark;
}

function askDrink(name, dateOfBirthday) {
    let currYear = new Date().getFullYear();
    let personBirthYear = dateOfBirthday.getFullYear();
    let message = `Сожалею, ${name}, но я не могу вам продать алкоголь. Зато могу предложить вам замечательный клюквенный компот!`;

    if (currYear - personBirthYear >= 18) message = `Не желаете ли олд-фэшн, ${name}?`;

    return message;
}
