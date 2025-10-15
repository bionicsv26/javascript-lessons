'use strict'

const title = document.getElementsByTagName('h1')[0]
const btnStart = document.getElementsByClassName('handler_btn')[0]
const btnReset = document.getElementsByClassName('handler_btn')[1]
const btnPlus = document.querySelector('.screen-btn')
const otherItemPercent = document.querySelectorAll('.other-items.percent')
const otherItemNumber = document.querySelectorAll('.other-items.number')
const rollbackInput = document.querySelector('.rollback input[type="range"]')
const rangeValueSpan = document.querySelector('.rollback span.range-value')
const totalInput = Array.from(document.getElementsByClassName('total-input'))
let screens = document.querySelectorAll('.screen')

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    start: function () {
        appData.asking()
        appData.getPrices()
        appData.getTitle()
        appData.getFullPrice()
        appData.getServicePercentPrices()
        appData.logger()
    },
    asking: function () {
        let title
        do {
            title = prompt('Как называется ваш проект?', 'Калькулятор верстки')
        } while (appData.isNumber(title) || title === null)
        appData.title = title

        for (let i = 0; i < 2; i++) {
            let name
            do {
                name = prompt('Какие типы экранов нужно разработать?')
            } while (appData.isNumber(name) || name === null)
            let price = 0

            do {
                price = prompt('Сколько будет стоить данная работа?')
            } while (!appData.isNumber(price))
            appData.screens.push({
                id: i,
                name: name,
                price: price
            })
        }
        appData.adaptive = Boolean(confirm('Нужен ли адаптив на сайте?', 'да'))

        for (let i = 0; i < 2; i++) {
            let name
            do {
                name = prompt('Какой дополнительный тип услуги нужен?')
            } while (appData.isNumber(name) || name === null)
            let price = 0

            do {
                price = prompt('Сколько это будет стоить?')
            } while (!appData.isNumber(price))
            if (appData.services.hasOwnProperty(name)) {
                appData.services[`${name}${i}`] = +price
            } else appData.services[name] = +price
        }
    },
    getPrices: function () {
        appData.screenPrice = appData.screens.reduce((sum, screen) => sum + +screen.price, 0)

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
    },
    getTitle: function () {
        appData.title = appData.title.trim().toUpperCase()[0] + appData.title.trim().toLowerCase().slice(1, )
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
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
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - Math.ceil(appData.fullPrice * appData.rollback / 100)
    },
    logger: function () {
        for (let element in appData) {
            console.log(element, appData[element]);
        }
    }
}

appData.start()