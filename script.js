'use strict'

let title
let screens
let screenPrice
let adaptive

let service1
let service2

let rollback = 25
let allServicePrices
let fullPrice
let servicePercentPrice

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && +(num) > 0 && num !== null
}

const asking = function () {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки')
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные')
    do {
        screenPrice = prompt('Сколько будет стоить данная работа?')
    } while (!isNumber(screenPrice))
    screenPrice = +(screenPrice.trim())
    adaptive = Boolean(confirm('Нужен ли адаптив на сайте?', 'да'))
}

const getAllServicePrices = function () {
    let sum = 0
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        while (true) {
            const input = prompt('Сколько это будет стоить?')
            if (!isNumber(input)) {
                alert('Стоимость должна быть числом больше нуля')
                continue
            } else {
                sum += +(input.trim())
                break
            }
        }
    }
    return sum
}

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

const getRollbackMessage = function (price) {
    switch (true) {
        case price >= 30000:
            return 'Даем скидку в 10%';
        case price >= 15000:
            return 'Даем скидку в 5%';
        case price >= 0:
            return 'Скидка не предусмотрена';
        default:
            return 'Что то пошло не так';
    }
}

function getFullPrice(screenPrice, allServicePrices) {
    return screenPrice + allServicePrices
}

function getTitle(title) {
    return title.trim().toUpperCase()[0] + title.trim().toLowerCase().slice(1, )
}

function getServicePercentPrices(fullPrice, rollback) {
    return fullPrice - Math.ceil(fullPrice * rollback / 100)
}

asking()
title = getTitle(title)
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice(screenPrice, allServicePrices)
servicePercentPrice = getServicePercentPrices(fullPrice, rollback)

showTypeOf(title)
showTypeOf(fullPrice)
showTypeOf(adaptive)

console.log(getRollbackMessage(fullPrice))
console.log(screens)
console.log('Стоимость верстки экранов ' + screenPrice + ' юаней' + ' и стоимость разработки сайта ' + fullPrice + ' юаней')