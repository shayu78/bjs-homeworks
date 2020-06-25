"use strict";

// Задача 1
function parseCount(value) {
    const number = Number.parseInt(value);
    if (isNaN(number)) throw new Error('Невалидное значение');
    return number;
}

function validateCount(value) {
    let number;
    try {
        number = parseCount(value);
    } catch (error) {
        return error;
    }
    return number;
}

// Задача 2
class Triangle {
    constructor(side_a, side_b, side_c) {
        this.a = side_a;
        this.b = side_b;
        this.c = side_c;
        if (((this.a + this.b) <= this.c) ||
            ((this.b + this.c) <= this.a) ||
            ((this.c + this.a) <= this.b)) {
            throw new Error('Треугольник с такими сторонами не существует');
        }
    }

    getPerimeter() {
        return this.a + this.b + this.c;
    }

    getArea() {
        const halfPerimeter = (this.a + this.b + this.c) / 2;
        return parseFloat((Math.sqrt(halfPerimeter *
            (halfPerimeter - this.a) *
            (halfPerimeter - this.b) *
            (halfPerimeter - this.c))).toFixed(3));
    }
}

function getTriangle(a, b, c) {
    let triangle;
    try {
        triangle = new Triangle(a, b, c);
    } catch (error) {
        return {
            getArea: () => 'Ошибка! Неправильный треугольник',
            getPerimeter: () => 'Ошибка! Неправильный треугольник'
        };
    }
    return triangle;
}
