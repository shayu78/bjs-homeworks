"use strict";

// Задача 1
String.prototype.isPalindrome = function () {
    const str = this.toUpperCase().replace(/[^A-ZА-Я0-9]/g, '');    // удаляем из строки все символы кроме букв и цифр
    const str_reverse = str.split('').reverse().join('');   // меняем порядок
    return str === str_reverse;
};

// Задача 2
function getAverageMark(marks) {
    let averageMark = 0;
    const countMarks = marks.length;

    if (countMarks === 0) return averageMark;

    averageMark = marks.reduce((averageMark, currentValue) => averageMark + currentValue, averageMark) / countMarks;
    return Math.round(averageMark);
}

// Задача 3
function checkBirthday(birthday) {
    // const birth = new Date(birthday).getTime();
    const birthDate = new Date(birthday);

    // if (isNaN(birth) {
    if (isNaN(birthDate.getTime())) {
        alert('Некорректная дата дня рождения');
        return false;
    }

    // const now = Date.now();
    const nowDate = new Date();

    // if (birth > now) {
    if (birthDate > nowDate) {
        alert('День рождения в будущем');
        return false;
    }

    return ((nowDate.getFullYear() - birthDate.getFullYear()) >= 18 
            && nowDate.getMonth() >= birthDate.getMonth() 
            && nowDate.getDate() >= birthDate.getDate());

    // const diff = now - birth;
    // 365 и 1⁄4 дня = 365,25 дня (точно) — юлианский год, средняя продолжительность года в юлианском календаре; равен точно 31 557 600 секунд СИ
    // return Math.floor((now - birth) / 31557600000) >= 18;
}

/*function isLeapYear(year) {
    // Високосный год не только должен быть кратен 4, но и:
    //     исключение первое: если год при кратности четырём делится на 100 — он не високосный
    //     исключение второе: если год при кратности четырём делится на 400 без остатка — он всегда високосный
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}*/
