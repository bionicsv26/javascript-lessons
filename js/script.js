'use strict'

const title = document.getElementsByTagName('h1')[0]
const btnPlus = document.querySelector('.screen-btn')
const otherItemPercent = document.querySelectorAll('.other-items.percent')
const otherItemNumber = document.querySelectorAll('.other-items.number')

const inputRange = document.querySelector('.rollback input')
const inputRangeValue = document.querySelector('.rollback .range-value')

const btnStart = document.getElementsByClassName('handler_btn')[0]
const btnReset = document.getElementsByClassName('handler_btn')[1]

const total = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]

let screens = document.querySelectorAll('.screen')

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    screenCount: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();

        // Слушаем все изменения в .screen
        document.addEventListener('input', (e) => {
            if (e.target.closest('.screen')) appData.validateForm();
        });
        document.addEventListener('change', (e) => {
            if (e.target.closest('.screen select')) appData.validateForm();
        });

        inputRange.addEventListener('input', (e) => {
            const value = e.target.value;
            inputRangeValue.textContent = value + '%';
            appData.rollback = +value;
        });

        btnPlus.addEventListener('click', () => {
            appData.addScreensBlock();
            appData.validateForm(); // проверяем после добавления
        });

        btnStart.addEventListener('click', appData.start);

        // Изначальная проверка
        appData.validateForm();
    },
    addTitle: function () {
        document.title = title.textContent
    },
    start: function () {
        appData.resetData()
        appData.addScreens()
        appData.addServices()
        appData.addPrices()
        // appData.logger()
        console.log(appData);
        appData.showResults()
    },
    resetData: function () {
        appData.screens = [];
        appData.servicesPercent = {};
        appData.servicesNumber = {};
        appData.screenPrice = 0;
        appData.screenCount = 0;
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        appData.fullPrice = 0;
        appData.servicePercentPrice = 0;
    },
    showResults: function () {
        total.value = appData.screenPrice
        totalCount.value = appData.screenCount
        totalCountOther.value = appData.servicePricesNumber + appData.servicePricesPercent
        fullTotalCount.value = appData.fullPrice
        totalCountRollback.value = appData.servicePercentPrice
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen')

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            })
        })
    },
    addServices: function () {
        otherItemPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItemNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addScreensBlock: function () {
        screens = document.querySelectorAll('.screen')
        const cloneScreen = screens[0].cloneNode(true)
        cloneScreen.querySelector('input').value = ''
        screens[screens.length - 1].after(cloneScreen)
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce((sum, screen) => sum + +screen.price, 0)
        appData.screenCount = appData.screens.reduce((sum, screen) => sum + screen.count, 0)

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }
        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent

        appData.servicePercentPrice = appData.fullPrice - Math.ceil(appData.fullPrice * appData.rollback / 100)
    },
    validateForm: function () {
        const screenBlocks = document.querySelectorAll('.screen');
        let isValidScreen = false;

        screenBlocks.forEach(block => {
            const select = block.querySelector('select');
            const input = block.querySelector('input');

            const isSelected = select.value.trim() !== '';
            const count = +input.value;
            // Если блок не пустой — он должен быть ВАЛИДЕН
            if (isSelected && !isNaN(count) && count > 0) {
                isValidScreen = true;
            } else {
                // Если блок частично заполнен, но невалиден → расчёт запрещён
                isValidScreen = false;
                return false;
            }
        });

        btnStart.disabled = !isValidScreen;
    },
    logger: function () {
        for (let element in appData) {
            console.log(element, appData[element]);
        }
    }
}

appData.init()