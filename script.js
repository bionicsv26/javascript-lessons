'use strict'

let title = prompt('Как называется ваш проект?')
let screens = prompt('Какие типы экранов нужно разработать?')
let screenPrice = Number(prompt('Сколько будет стоить данная работа?'))
let adaptive = confirm('Нужен ли адаптив на сайте?')
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = Number(prompt('Сколько это будет стоить?'));
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = Number(prompt('Сколько это будет стоить?'));
let rollback = 25;
let fullPrice = screenPrice + servicePrice1 + servicePrice2
const servicePercentPrice = fullPrice - Math.ceil(fullPrice * rollback / 100)

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

const getDiscountMessage = function (price) {
    switch (true) {
        case price >= 30000:
            return 'Даем скидку в 10%';
            break;
        case price >= 15000:
            return 'Даем скидку в 5%';
            break;
        case price >= 0:
            return 'Скидка не предусмотрена';
            break;
        default:
            return 'Что то пошло не так';
    }
}

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getDiscountMessage(fullPrice));
console.log('длина строки переменной screens - ', screens.length);
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей/ долларов/гривен/юани');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей/ долларов/гривен/юани');
console.log(screens.toLowerCase().split(', '));
console.log('Процент отката посреднику за работу', fullPrice * (rollback / 100));