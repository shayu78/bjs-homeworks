class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null;
    }

    addClock(time, callback, id) {
        if (!id) throw new Error('Не задан идентификатор звонка');
        if (this.alarmCollection.findIndex(element => element.id === id) == -1)
            this.alarmCollection.push({ id, time, callback });
        else console.error('Звонок с таким идентификатором уже существует');
    }

    removeClock(id) {
        const size = this.alarmCollection.length;
        this.alarmCollection = this.alarmCollection.filter(element => element.id !== id);
        return this.alarmCollection.length === size ? false : true;
    }

    getCurrentFormattedTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;
    }

    start() {
        function checkClock(call, thisArg) {
            if (thisArg.getCurrentFormattedTime() === call.time) call.callback();
        }

        if (!this.timerId) {
            this.timerId = setInterval(() => this.alarmCollection.forEach(element => checkClock(element, this)), 1000);
        }
    }

    stop() {
        if (this.timerId) clearInterval(this.timerId);
        this.timerId = null;
    }

    printAlarms() {
        console.log(`Печать всех будильников в количестве: ${this.alarmCollection.length}`);
        this.alarmCollection.forEach(element => console.log(`Будильник №${element.id} заведен на ${element.time}`));
    }

    clearAlarms() {
        if (this.timerId) clearInterval(this.timerId);
        this.alarmCollection.length = 0;
    }
}

const alarm = new AlarmClock();
try {
    // alarm.addClock("02:02", () => console.log('Пора вставать 4'));
    alarm.addClock(alarm.getCurrentFormattedTime(), () => console.log('Пора вставать'), 2);
    alarm.addClock("12:49", () => {
        console.log('Пора вставать 2');
        alarm.removeClock(1);
    }, 1);
    alarm.addClock("12:50", () => {
        console.log('Пора вставать 3');
        alarm.stop();
        alarm.clearAlarms();
        alarm.printAlarms();
    }, 4);
    alarm.printAlarms();
    alarm.start();
} catch (error) {
    console.error(error);
}
