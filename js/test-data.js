let generateTestData = (function() {
    // Конструктор для тестовых данных
let ExampleItem = function(type, desc, sum) {
    this.type = type;
    this.desc= desc;
    this.sum = sum;
}
// Массив с тестовыми данными
let testData = [
    new ExampleItem('inc', 'Зарплата', 1300),
    new ExampleItem('inc', 'ПромАльп', 700),
    new ExampleItem('inc', 'Инвестиции', 130),
    new ExampleItem('inc', 'Фриланс', 50),
    new ExampleItem('exp', 'Кредит', 30),
    new ExampleItem('exp', 'Продукты', 20),
    new ExampleItem('exp', 'Ипотека', 90),
    new ExampleItem('exp', 'Страховка', 40)
];
// Функ-я для рандомного выбора из массива
function getrandomInt(max) {
    return Math.floor(Math.random() * max);
}
// Функ-я для вывода рандомных данных в форму
function insertInUi() {
    let random = getrandomInt(testData.length);
    let randomItem = testData[random];

    document.querySelector('#input__type').value = randomItem.type;
    document.querySelector('#input__description').value = randomItem.desc;
    document.querySelector('#input__value').value = randomItem.sum;
}
return {
    init: insertInUi
}
})();

generateTestData.init();
