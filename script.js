let title = 'Продажа смартфонов и планшетов';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 220.50;
let rollback = 25;
let fullPrice = 3000.00;
let adaptive = true;

// alert('Продолжать нужно?');
// console.log('Требую продолжения банкета');
// console.log('Тип данных переменной title - ', typeof title);
// console.log('Тип данных переменной fullPrice - ', typeof fullPrice);
// console.log('Тип данных переменной adaptive - ', typeof adaptive);

// console.log('длина строки переменной screens - ', screens.length);

// console.log('Стоимость верстки экранов ' + screenPrice + ' рублей/ долларов/гривен/юани');
// console.log('Стоимость разработки сайта ' + fullPrice + ' рублей/ долларов/гривен/юани');

// console.log(screens.toLowerCase().split(', '));

// console.log('Процент отката посреднику за работу', fullPrice * (rollback/100));

// lesson 3

title = prompt('Как называется ваш проект?')
screens = prompt('Какие типы экранов нужно разработать?')
screenPrice = Number(prompt('Сколько будет стоить данная работа?'))
adaptive = confirm('Нужен ли адаптив на сайте?')
console.log(typeof adaptive, adaptive);


const services = {};
screenPrice = 0;
for (let i = 1; i < 3; i++) {
    services[`service${i}`] = prompt('Какой дополнительный тип услуги нужен?');
    services[`servicePrice${i}`] = Number(prompt('Сколько это будет стоить?'));
    console.log(i, services);
}

fullPrice = screenPrice + services.servicePrice1 + services.servicePrice2

const servicePercentPrice = fullPrice - Math.ceil(fullPrice * rollback / 100)
console.log('Получилось заработать', servicePercentPrice);
console.log('fullPrice', fullPrice);

switch (true) {
    case fullPrice >= 30000:
        console.log('Даем скидку в 10%');
        break;
    case fullPrice >= 15000:
        console.log('Даем скидку в 5%');
        break;
    case fullPrice >= 0:
        console.log('Скидка не предусмотрена');
        break;
    default:
        console.log('Что то пошло не так');
        break;
}

alert('Сделаем расчеты еще раз?');