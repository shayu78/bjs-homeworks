String.prototype.isPalindrome = function () {
    const str = this.toUpperCase().replace(/[^A-ZА-Я0-9]/g, '');    // удаляем из строки все символы кроме букв и цифр
    const str_reverse = str.split('').reverse().join('');   // меняем порядок
    return str === str_reverse;
};

function getAverageMark(marks) {
    let averageMark = 0;
    const countMarks = marks.length;

    if (countMarks === 0) return averageMark;

    const roundedAverage = Math.round(marks.reduce((averageMark, currentValue) => averageMark + currentValue, averageMark) / countMarks);
    return roundedAverage;
}

function checkBirthday(birthday) {
    const birth = new Date(birthday).getTime();

    if (isNaN(birth)) {
        alert(`Параметр birthday (дата рождения) содержит неправильное значение (${birthday})`);
        return false;
    }

    const now = Date.now();

    if (birth > now) {
        alert('День рождения в будущем, странно!!!');
        return false;
    }

    // const diff = now - birth;
    return Math.floor((now - birth) / (1000 * 3600 * 24 * 365.25)) >= 18;
}

/*function isLeapYear(year) {
    // Високосный год не только должен быть кратен 4, но и:
    //     исключение первое: если год при кратности четырём делится на 100 — он не високосный
    //     исключение второе: если год при кратности четырём делится на 400 без остатка — он всегда високосный
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}*/
