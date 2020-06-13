"use strict";

function calculateTotalMortgage(percent, contribution, amount, date) {
    let totalAmount = 0;

    if (isNaN(percent) || percent <= 0) {
        alert(`Параметр percent (процентная ставка) содержит неправильное значение (${percent})`);
        return totalAmount;
    }
    percent /= 100;

    if (isNaN(contribution) || contribution < 0) {
        alert(`Параметр contribution (первоначальный взнос) содержит неправильное значение (${contribution})`);
        return totalAmount;
    }

    if (isNaN(amount) || amount <= 0) {
        alert(`Параметр amount (сумма кредита) содержит неправильное значение (${amount})`);
        return totalAmount;
    }

    if (contribution > amount) {
        alert('Сумма первоначального взноса не должна превышать сумму кредита');
        return totalAmount;
    }

    if (isNaN(date.getTime())) {
        alert(`Параметр date (дата окончания кредита) содержит неправильное значение (${date})`);
        return totalAmount;
    }
    if (date.getTime() <= Date.now()) {
        alert('Дата окончания выплаты кредита не должна быть ранее текущей даты');
        return totalAmount;
    }

    let creditMonth = getCreditInMonths(date);
    let monthPayment = (amount - contribution) * ((percent / 12) + (percent / 12) / (((1 + (percent / 12)) ** creditMonth) - 1));
    totalAmount = monthPayment * creditMonth;

    return Number.parseFloat(totalAmount.toFixed(2));
}

// считаем количество месяцев кредита (расчет не является абсолютно точным)
function getCreditInMonths(date) {
    let now = new Date();
    let creditMonth = 0;
    if (date.getFullYear() === now.getFullYear()) {
        // срок кредита заканчивается в этом же году
        creditMonth = date.getMonth() - now.getMonth();
        if (creditMonth === 0) creditMonth++;       // кредит может быть выдан минимум на 1 месяц               
    }
    else if (date.getMonth() < now.getMonth())
        creditMonth = (date.getFullYear() - now.getFullYear() - 1) * 12 + (12 - now.getMonth() + date.getMonth());
    else creditMonth = (date.getFullYear() - now.getFullYear()) * 12 + (date.getMonth() - now.getMonth());

    return creditMonth;
}

function getGreeting(name) {
    let greeting = 'Привет, мир! Меня зовут Аноним';

    if (!(!name || String(name).trim().length === 0)) greeting = `Привет, мир! Меня зовут ${name}`;

    return greeting;
}
