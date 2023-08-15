let viewController = (function () {

    let DOMstrings = {
        form: '#budget-form',
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        incomeContainer: '#income__list',
        expenseContainer: '#expenses__list',
        budgetLabel: '#budget-value',
        incomeLabel: '#income-label',
        expensesLabel: '#expense-label',
        expensesPercentLabel: '#expense-percent-label',
        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year'
    }

    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
        }
    }
    // Ф-я для форматирования значений
    function formatNumber(num, type) {
        let numSplit,int,dec,newInt,resultNumber;
        // Убираем знак минус у отриц.чисел
        num = Math.abs(num);
        // Приводим числа к 2ум знакам после запятой
        num = num.toFixed(2);
        // Выделяем целую и десятичную части
        numSplit = num.split('.');
        // Целая часть
        int = numSplit[0];
        // Десятичная часть
        dec = numSplit[1];

        if(int.length > 3) {
            newInt = '';
            for(let i = 0; i < int.length / 3; i++) {
                // Формируем новую строку и добавляем запятые каждые три числа
                newInt = ',' + int.substring(int.length - 3 * (i + 1), int.length - 3 * i) + newInt;
            }
            if(newInt[0] === ',') {
                newInt = newInt.substring(1);
            }
        } else if (int === '0') {
            newInt = '0';
        } else {
            newInt = int;
        }
        // Ставим знак перед числом в зависимости от данных
        resultNumber = newInt + '.' + dec;
        if(type === 'exp') {
            resultNumber = '- ' + resultNumber;
        } else if(type === 'inc') {
            resultNumber = '+ ' + resultNumber;
        }
        return resultNumber;
    }

    function renderListItem(obj, type) {
        let containerElement, html;
        if(type === 'inc') {
            containerElement = DOMstrings.incomeContainer;
            html = `<li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img src="./img/circle-green.svg" alt="delete"/>
                            </button>
                        </div>
                    </li>`;
        } else if (type === 'exp') {
            containerElement = DOMstrings.expenseContainer;
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                            <div class="item__title">%description%</div>
                            <div class="item__right">
                                <div class="item__amount">
                                    %value%
                                    <div class="item__badge">
                                        <div class="item__percent badge badge--dark">
                                            15%
                                        </div>
                                    </div>
                                </div>
                                <button class="item__remove">
                                    <img src="./img/circle-red.svg" alt="delete" />
                                </button>
                            </div>
                        </li>`
        };

        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

        document.querySelector(containerElement).insertAdjacentHTML("beforeend", newHtml);
    }
    // Очищение полей формы
    function clearFields() {
        let inputDesc, inputVal;
        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputVal = document.querySelector(DOMstrings.inputValue);

        inputDesc.value = '';
        inputDesc.focus();
        inputVal.value = '';
    }
    // Рендер бюджета
    function updatebudget(obj) {
        let type;
        if(obj.budget > 0) {
            type = 'inc';
        } else {
            type = 'exp';
        }

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
        if(obj.percentage > 0) {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = obj.percentage;
        } else {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = '--';
        }
    }
    // Ф-я для удаления записи из шаблона
    function deleteListItem(itemID) {
        document.getElementById(itemID).remove();
    }
    // Ф-я для вывода процентов в шаблон
    function updateItemsPersentages(items) {
        items.forEach(function(item) {
            let el = document.getElementById(`exp-${item[0]}`).querySelector('.item__percent');
            // Меняем контент внутри дива с процентами
            if(item[1] >= 0) {
                el.parentElement.style.display = 'block';
                el.textContent = item[1] + '%';
            } else {
                el.parentElement.style.display = 'none';
            }
        });
    }
    // Отображение текущей даты
    function displayMonth() {
        let now,year,month;

        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();

        monthArray = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        month = monthArray[month];

        document.querySelector(DOMstrings.monthLabel).innerText = month;
        document.querySelector(DOMstrings.yearLabel).innerText = year;
    }
    return {
        getInput: getInput,
        renderListItem: renderListItem,
        clearFields: clearFields,
        updatebudget: updatebudget,
        deleteListItem: deleteListItem,
        updateItemsPersentages: updateItemsPersentages,
        displayMonth: displayMonth,
        getDomStrings: function() {
            return DOMstrings
        }
    }
}) ();