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

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    service1: '',
    service2: '',
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    start: function () {
        appData.asking()
        appData.title = appData.getTitle()
        appData.allServicePrices = appData.getAllServicePrices()
        appData.fullPrice = appData.getFullPrice()
        appData.servicePercentPrice = appData.getServicePercentPrices()
        appData.logger()
    },
    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки')
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные')
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?')
        } while (!appData.isNumber(appData.screenPrice))

        appData.adaptive = Boolean(confirm('Нужен ли адаптив на сайте?', 'да'))
    },
    getTitle: function () {
        return appData.title.trim().toUpperCase()[0] + appData.title.trim().toLowerCase().slice(1, )
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },
    getAllServicePrices: function () {
        let sum = 0
        for (let i = 0; i < 2; i++) {
            let price = 0

            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
            }

            do {
                price = prompt('Сколько это будет стоить?')
            } while (!appData.isNumber(price)) {
                sum += +price
            }
        }
        return sum
    },
    getRollbackMessage: function (price) {
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
    },
    getFullPrice: function () {
        return +appData.screenPrice + appData.allServicePrices
    },
    getServicePercentPrices: function () {
        return appData.fullPrice - Math.ceil(appData.fullPrice * appData.rollback / 100)
    },
    logger: function () {
        for (let element in appData) {
            console.log(element, appData[element]);
        }
    }
}

appData.start()