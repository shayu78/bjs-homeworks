"use strict";

function sleep(milliseconds) {
    const e = new Date().getTime() + milliseconds;
    while (new Date().getTime() <= e) { }
}

function sum(...args) {
    // sleep(1);
    return args.reduce((sum, arg) => {
        return sum += +arg;
    }, 0);
}

// console.log(sum(1, 2, 3, 4, 5));
// console.log(sum());

function compareArrays(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2))
        throw new Error('Неверные параметры функции! Должны быть переданы массивы');
    return arr1.length == arr2.length && arr1.every((value, index) => value === arr2[index]);
}

// try {
//     console.log(compareArrays(1, [6]));
//     console.log(compareArrays([8, 9], [6])); // false, разные значения
//     console.log(compareArrays([8, 9, 5, 4], [8, 9, 5, 4, 8, 3, 5])); // false, разные значения
//     console.log(compareArrays([9, 2, 4, 8, 2], [9, 2, 4])); // false, разные значения
//     console.log(compareArrays([1, 2, 3], [2, 3, 1])); // false, разные индексы, хотя и одинаковые значения
//     console.log(compareArrays([8, 1, 2], [8, 1, 2])); // true
// } catch (error) {
//     console.log(error);
// }

function memorize(fn, limit) {
    const memory = [];

    return function (...args) {
        const found = memory.find(element => compareArrays(element.args, args));
        if (found) {
            // console.log(`Результат функции ${fn} берётся из памяти`);
            return found.result;
        }
        else {
            // console.log(`Функция ${fn} вызвана не из памяти`);
            const result = fn(...args);
            const operationInfo = {};
            operationInfo.args = args;
            operationInfo.result = result;
            memory.push(operationInfo);
            if (memory.length > limit) {
                // console.log(`Размер массива memory = ${memory.length} превышает максимальное значение равное ${limit}`);
                memory.shift();
            }
            return result;
        }
    };
}

// const mD = memorize((a, b, c) => b ** 2 - 4 * a * c, 10);
// console.log(mD(20, 100, 2));
// console.log(mD(10, 5, 2));
// console.log(mD(10, 4, 2));
// console.log(mD(10, 1, 2));
// console.log(mD(10, 1, 3));
// console.log(mD(10, 1, 4));
// console.log(mD(10, 1, 5));
// console.log(mD(10, 1, 6));
// console.log(mD(10, 1, 7));
// console.log(mD(10, 1, 8));
// console.log(mD(10, 1, 9));

// const mMux = memorize((a, b) => a * b, 2);
// console.log(mMux(20, 100, 2));
// console.log(mMux(20, 100, 2));
// console.log(mMux(20, 10, 3));

const testArray = [
    [1, 2, 3],
    [1, 2],
    [1, 2, 3],
    [1, 2],
    [9, 5, 2, 4]
]

function testCase(fn, timer) {
    console.time(timer);
    for (let i = 0; i < 100; i++) testArray.forEach(element => fn(...element));
    console.timeEnd(timer);
}

// функция sum вычисляется каждый раз, вне зависимости от входных параметров (в данном тесте 500 раз)
testCase(sum, "test");

// функция sum вычисляется единожды для каждого уникального набора входных параметров (в данном тесте 3 раза)
const mSum = memorize(sum, 10);
testCase(mSum, "test2");

// если убираем задержку, то функция отрабатывает быстрее оптимизированной, 
// поскольку содержит простой код арифметической операции, а оптимизированная функция каждый раз осуществляет операции 
// поиска элемента в массиве и сравнения, что является более затратным, плюс при определенных условиях еще и формирует 
// объект и заносит его в массив
