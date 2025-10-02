const title = 'Продажа смартфонов и планшетов';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 220.50;
let rollback = 25;
let fullPrice = 3000.00;
let adaptive = true;

// alert('Продолжать нужно?');
// console.log('Требую продолжения банкета');
console.log('Тип данных переменной title - ', typeof title);
console.log('Тип данных переменной fullPrice - ', typeof fullPrice);
console.log('Тип данных переменной adaptive - ', typeof adaptive);

console.log('длина строки переменной screens - ', screens.length);

console.log('Стоимость верстки экранов ' + screenPrice + ' рублей/ долларов/гривен/юани');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей/ долларов/гривен/юани');

console.log(screens.toLowerCase().split(', '));

console.log('Процент отката посреднику за работу', fullPrice * (rollback/100));