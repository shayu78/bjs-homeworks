// Задача №1
function getSolutions(a, b, c) {
    let D = b ** 2 - 4 * a * c;

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
    let result = getSolutions(a, b, c);
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
    let outData = {};
    let accumulator = 0;
    let countSubjects = 0;
    let subjectAverageMark;

    for (let prop in data) {
        subjectAverageMark = getAverageMark(data[prop]);
        outData[prop] = subjectAverageMark;
        accumulator += subjectAverageMark;
        countSubjects++;
    }
    if (countSubjects === 0) outData['average'] = accumulator;
    else outData['average'] = accumulator / countSubjects;

    return outData;
}

function getAverageMark(marks) {
    let averageMark = 0;
    let countMarks = marks.length;

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
    let outData = {};
    let outPropertyName = '';

    for (let prop in secretData) {
        if (prop === 'aaa') outPropertyName = 'firstName';
        else if (prop === 'bbb') outPropertyName = 'lastName';
        outData[outPropertyName] = getDecodedValue(secretData[prop]);
    }

    return outData;
}

function getDecodedValue(secret) {
    let name;

    switch (secret) {
        case 0: {
            name = 'Родриго';
            break;
        }
        case 1: {
            name = 'Эмильо';
            break;
        }
        default: name = '';
    }

    return name;
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