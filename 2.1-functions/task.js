"use strict";

// Задача №1
function getSolutions(a, b, c) {
    const D = b ** 2 - 4 * a * c;

    if (D < 0) {
        return {
            D,
            roots: []
        };
    } else if (D === 0) {
        let x1 = -b / (2 * a);
        return {
            D,
            roots: [x1]
        };
    } else {
        let x1 = (-b + Math.sqrt(D)) / (2 * a);
        let x2 = (-b - Math.sqrt(D)) / (2 * a);
        return {
            D,
            roots: [x1, x2]
        };
    }
}

function showSolutionsMessage(a, b, c) {
    const result = getSolutions(a, b, c);
    console.log(`Вычисляем корни квадратного уравнения ${a}x² + ${b}x + ${c}`);
    console.log(`Значение дискриминанта: ${result.D}`);
    if (result.roots.length === 1) console.log(`Уравнение имеет один корень X₁ = ${result.roots[0]}`);
    else if (result.roots.length === 2) console.log(`Уравнение имеет два корня. X₁ = ${result.roots[0]}, X₂ = ${result.roots[1]}`);
    else console.log('Уравнение не имеет вещественных корней');
}

showSolutionsMessage(1, 2, 3);
showSolutionsMessage(7, 20, -3);
showSolutionsMessage(2, 4, 2);

// Задача №2
function getAverageScore(data) {
    const outData = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) outData[key] = getAverageMark(data[key]);
    }
    outData['average'] = getAverageMark(Object.values(outData));

    return outData;
}

function getAverageMark(marks) {
    let averageMark = 0;
    const countMarks = marks.length;

    if (countMarks === 0) return averageMark;

    return marks.reduce((averageMark, currentValue) => averageMark + currentValue, averageMark) / countMarks;
}

console.log(getAverageScore({
    algebra: [2, 4, 5, 2, 3, 4],
    geometry: [2, 4, 5],
    russian: [3, 3, 4, 5],
    physics: [5, 5],
    music: [2, 2, 6],
    english: [4, 4, 3],
    poetry: [5, 3, 4],
    chemistry: [2],
    french: [4, 4]
}));

// Задача №3
function getPersonData(secretData) {
    const outData = {};
    let outPropertyName = '';

    for (const key in secretData) {
        if (secretData.hasOwnProperty(key)) {
            if (key === 'aaa') outPropertyName = 'firstName';
            else if (key === 'bbb') outPropertyName = 'lastName';
            outData[outPropertyName] = getDecodedValue(secretData[key]);
        }
    }

    return outData;
}

function getDecodedValue(secret) {
    return secret ? 'Эмильо' : 'Родриго';
}

console.log(getPersonData({
    aaa: 0,
    bbb: 0
}));

console.log(getPersonData({
    aaa: 1,
    bbb: 0
}));

console.log(getPersonData({
    aaa: 0,
    bbb: 1
}));

console.log(getPersonData({
    aaa: 1,
    bbb: 1
}));
