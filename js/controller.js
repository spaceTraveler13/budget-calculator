let controller = (function (budgetCtrl, uiCtrl) {
    let setupEventListeners = function() {
        let DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);
        // Клик по таблице доходов и расходов
        document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem)
    }
    // Оьновление и пересчет процентов
    function updatePercentages() {
        // Расчет процентов для Exspense
        budgetCtrl.calculatePercentages();
        budgetCtrl.test();
        // Получаем данные с процентами
        let idsAndPercents = budgetCtrl.getAllIdsAndPercentages();
        // Рендерим проценты в шаблон
        uiCtrl.updateItemsPersentages(idsAndPercents);
    }
    // Функ-я при отправке формы
    function ctrlAddItem (event) {
        event.preventDefault();
        // Получение данных из формы
        let input = uiCtrl.getInput();
        // Проверка на пустые поля
        if(input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // Добавление в model
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            budgetCtrl.test();
            // Добавление "записи" в UI
            uiCtrl.renderListItem(newItem, input.type);
            uiCtrl.clearFields();
            generateTestData.init();
            // Расчёт бюджета
            updatebudget();
            // Обновление процентов
            updatePercentages();
            
        }
    }
    // Ф-я для удаления элементов в таблице доходов и расходов
    function ctrlDeleteItem(event) {
        let itemID,splitID,type,ID;
        if (event.target.closest('.item__remove')) {
            // Находим ID записи для удаления
            itemID = event.target.closest('li.budget-list__item').id;
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            // Удаление записи из модели
            budgetCtrl.deleteItem(type,ID);
            // Удаление записи из шаблона
            uiCtrl.deleteListItem(itemID);
            // Пересчет бюджета
            updatebudget ();
            // Пересчет процентов
            updatePercentages();
        }
    }

    // Функ-я для расчета бюджета
    function updatebudget () {
        // Расчитать бюджет в модели
        budgetCtrl.calculateBudget();
        // Получить рассчитаный бюджет из модели
        budgetObj = budgetCtrl.getBudget();
        // Отобразить бюджет в шаблоне
        uiCtrl.updatebudget(budgetObj);
        // Пересчет процентов
        updatePercentages();
    }

    return {
        init: function() {
            console.log('App started!');
            uiCtrl.displayMonth();
            setupEventListeners();
            uiCtrl.updatebudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });

        }
    }
}) (modelController, viewController);

controller.init();