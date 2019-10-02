'use strict';

let startButton = document.querySelector('.start'),
    budgetField = document.querySelector('.budget-value'),
    dayBudgetField = document.querySelector('.daybudget-value'),
    lvlValueField = document.querySelector('.level-value'),
    expensesField = document.querySelector('.expenses-value'),
    optionalExpensesField = document.querySelector('.optionalexpenses-value'),
    incomeField = document.querySelector('.income-value'),
    monthSavingsField = document.querySelector('.monthsavings-value'),
    yearSavingsField = document.querySelector('.yearsavings-value');

    let expensesItems = document.querySelectorAll('.expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');



let money, time;

    
startButton.addEventListener('click', function(){
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetField.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth()+1;
    dayValue.value = new Date(Date.parse(time)).getDate()+1;
});

expensesBtn.addEventListener('click',function(){
    let sum = 0;

    for (let i = 0; i < expensesItems.length; i++) {
        let a = expensesItems[i].value,
            b = expensesItems[++i].value;

        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    }
    expensesField.textContent = sum;
});
 

optionalExpensesBtn.addEventListener('click', function(){
    optionalExpensesField.textContent = "";
    for (let i = 0; i <= optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesField.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', function(){
    if(appData.budget!=undefined){
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        dayBudgetField.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            lvlValueField.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            lvlValueField.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            lvlValueField.textContent = "Это высокий уровень достатка!";
        } else {
            lvlValueField.textContent = "Ошибочка...!";
        }
    }else{
        dayBudgetField.textContent = "Произошла ошибка";
    }
});

checkSavings.addEventListener('click', function(){
    if(appData.savings == false){
        appData.savings=true;
    }else{
        appData.savings=false;
    }
});

incomeItem.addEventListener('input',function(){
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeField.textContent = appData.income;
});


sumValue.addEventListener('input', function(){
    if(appData.savings){
        let sum = + sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsField.textContent = appData.monthIncome.toFixed(1);
        yearSavingsField.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function(){
    if(appData.savings){
        let sum = + sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsField.textContent = appData.monthIncome.toFixed(1);
        yearSavingsField.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};
