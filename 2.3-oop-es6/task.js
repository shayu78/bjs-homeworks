"use strict";

// Задача 1
class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    fix() {
        this.state *= 1.5;
    }

    set state(state) {
        if (state < 0) this._state = 0;
        else if (state > 100) this._state = 100;
        else this._state = state;
    }

    get state() {
        return this._state;
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = 'magazine';
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = 'book';
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'novel';
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'fantastic';
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'detective';
    }
}

const sherlock = new PrintEditionItem("Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе", 2019, 1008);

console.log(sherlock.releaseDate); //2019
console.log(sherlock.state); //100
sherlock.fix();
console.log(sherlock.state); //100

const picknick = new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168);
console.log(picknick.author); //"Аркадий и Борис Стругацкие"
picknick.state = 10;
console.log(picknick.state); //10
picknick.fix();
console.log(picknick.state); //15
console.log(picknick.type);

// Задача 2
class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book.state > 30) this.books.push(book);
    }

    // функция возвращает первую попавшуюся книгу по заданным критериям
    findBookBy(type, value) {
        for (const iterator of this.books) {
            if (iterator.hasOwnProperty(type) && iterator[type] === value) return iterator;
        }
        return null;
    }

    // функция удаляет первую попавшуюся книгу по заданному названию
    giveBookByName(bookName) {
        let index = 0;
        for (const iterator of this.books) {
            if (iterator.hasOwnProperty('name') && iterator.name === bookName) return this.books.splice(index, 1)[0];
            index++;
        }
        return null;
    }
}

const library = new Library("Библиотека имени Ленина");
library.addBook(new DetectiveBook("Артур Конан Дойл", "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе", 2019, 1008));
library.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));
const crocodile = new Magazine("Крокодил", 1924, 50);
crocodile.state = 10;
library.addBook(crocodile);

console.log(library.findBookBy("name", "Властелин колец")); //null
console.log(library.findBookBy("releaseDate", 1924).name); //"Мурзилка"

console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
console.log(library.giveBookByName("Машина времени"));
console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3

const counryLibrary = new Library("Центральная городская библиотека");
// const crocodile = new Magazine("Крокодил", 1924, 50);
crocodile.state = 90;
counryLibrary.addBook(crocodile);
counryLibrary.addBook(new DetectiveBook("Агата Кристи", "Убийство в Восточном экспрессе", 2000, 555));
counryLibrary.addBook(new FantasticBook("Рей Бредбери", "Улыбка", 1919, 13));
counryLibrary.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));

console.log(counryLibrary.findBookBy("releaseDate", 1919).name);
console.log("Количество книг до выдачи: " + counryLibrary.books.length);
const myBook = counryLibrary.giveBookByName(counryLibrary.findBookBy("releaseDate", 1919).name);
console.log(myBook);
myBook.state = 15;
console.log(myBook);
myBook.fix();
console.log(myBook);
counryLibrary.addBook(myBook);
console.log("Количество книг после попытки возврата: " + counryLibrary.books.length);

// Задача 3
class StudentLog {
    constructor(fullName) {
        this.fullName = fullName;
        this.marks = {};
    }

    getName() {
        return this.fullName;
    }

    addGrade(grade, subject) {
        if (this.marks[subject] === undefined) this.marks[subject] = [];
        if (!isNaN(grade) && Number.isInteger(grade) && (grade >= 1 && grade <= 5)) this.marks[subject].push(grade);
        else alert(`Вы пытались поставить некорректную оценку по предмету ${subject}. Допускаются только числа от 1 до 5`);

        return this.marks[subject].length;
    }

    getAverageBySubject(subject) {
        let averageMark = 0;
        if (this.marks[subject] === undefined) return averageMark;

        const countMarks = this.marks[subject].length;
        if (countMarks === 0) return averageMark;

        return this.marks[subject].reduce((averageMark, currentValue) => averageMark + currentValue, averageMark) / countMarks;
    }

    getTotalAverage() {
        let accumulator = 0;

        /*
        // вариант 1 (как по заданию)
        let countMarks = 0;  
        for (const key in this.marks) {
            if (this.marks.hasOwnProperty(key)) {
                const element = this.marks[key];
                for (const iterator of element) {
                    accumulator += iterator;
                }
                countMarks += element.length;
            }
        }
        if (countMarks === 0) return accumulator;
        return accumulator / countMarks;
        */

        // вариант 2 (более лаконичный)
        let countSubjects = 0;

        for (const key in this.marks) {
            if (this.marks.hasOwnProperty(key)) {
                accumulator += this.getAverageBySubject(key);
                countSubjects++;
            }
        }

        if (countSubjects === 0) return accumulator;
        return accumulator / countSubjects;
    }
}

const log = new StudentLog('Олег Никифоров');
console.log(log.getName());

console.log(log.addGrade(3, 'algebra'));
console.log(log.addGrade('отлично!', 'math'));
console.log(log.addGrade(4, 'algebra'));
console.log(log.addGrade(5, 'geometry'));
console.log(log.addGrade(25, 'geometry'));

log.addGrade(2, 'algebra');
log.addGrade(4, 'algebra');
log.addGrade(5, 'geometry');
log.addGrade(4, 'geometry');

console.log(log.getAverageBySubject('geometry'));
console.log(log.getAverageBySubject('algebra'));
console.log(log.getAverageBySubject('math'));

console.log(log.getTotalAverage());
console.log(log);

const log2 = new StudentLog('Петр Иванов');
console.log(log2.getName());
log2.addGrade(2, 'algebra');
log2.addGrade(4, 'algebra');
log2.addGrade(5, 'geometry');
log2.addGrade(4, 'geometry');
log2.addGrade(3, 'chemistry');

console.log(log2.getAverageBySubject('geometry'));
console.log(log2.getAverageBySubject('algebra'));
console.log(log2.getAverageBySubject('physics'));
console.log(log2.getAverageBySubject('chemistry'));

console.log(log2.getTotalAverage());
console.log(log2);
