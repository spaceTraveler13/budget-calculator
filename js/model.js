let modelController = (function () {
    // Конструктор для объектов типа "доход"
    let Income =  function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    // Конструктор для объектов типа "расход"
    let Expense =  function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
    // Метод для конструктора Expense для расчета процентов
    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
        this.percentage = -1;
        }
    }
    // Метод для возврата расчета процентов
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }
    // Функ-я для добавления новых данных
    function addItem(type, desc, val) {
        let newItem, ID;
        ID = 0;
        // Генерим новый ID
        if(data.allItems[type].length > 0) {
            let lastIndex = data.allItems[type].length - 1;
            ID = data.allItems[type][lastIndex].id + 1;
        } else {
            ID = 0;
        }
        // Создаем новый объект в зависимлсти от типа
        if (type === 'inc') {
            newItem = new Income(ID, desc, parseFloat(val));
        } else if (type === 'exp') {
            newItem = new Expense (ID, desc, parseFloat(val));
        }
        // Пушим в массив в объект data
        data.allItems[type].push(newItem);
        // Возвращаем новый объект
        return newItem;
    }
    // Ф-я для удаления элементов из таблицы доходов и расходов
    function deleteItem(type, id) {
        // Находим запись по ID в массиве с доходами и расходами
        let ids = data.allItems[type].map(function(item) {
            return item.id
        });
        // Находим индекс записи
        index = ids.indexOf(id);
        // Удаление найденной записи из массива по индексу
        if(index !== -1) {
            data.allItems[type].splice(index, 1);
        }
    }
    // Функция для расчета доходов или расходов
    function calculateTotalSum(type) {
        let sum = 0;
        data.allItems[type].forEach(function(item) {
            sum = sum + item.value;
        });
        return sum;
    }
    // Функ-я для расчета бюджета
    function calculateBudget() {
        // Расчет всех доходов и расходов
        data.totals.inc = calculateTotalSum('inc');
        data.totals.exp = calculateTotalSum('exp');
        // общий бюджет
        data.budget = data.totals.inc - data.totals.exp;
        // Расчет процентов для расходов
        if(data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percentage = -1;
        }
    }

    // Ф-я для возврата данных расчета
    function getBudget() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
    }
    // Ф-я для расчета процентов
    function calculatePercentages() {
        data.allItems.exp.forEach(function(item) {
            item.calcPercentage(data.totals.inc);
        })
    }
    // Ф-я для получения всех процентов
    function getAllIdsAndPercentages() {
        let allPerc = data.allItems.exp.map(function(item) {
            return [item.id, item.getPercentage()];
        })
        return allPerc;
    }

    // Объект для хранения данных "доход" и "расход"
    let data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    }
    return {
        addItem: addItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget,
        deleteItem: deleteItem,
        calculatePercentages: calculatePercentages,
        getAllIdsAndPercentages: getAllIdsAndPercentages,
        test: function() {
        }
    }
}) ();