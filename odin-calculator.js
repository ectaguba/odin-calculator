// let numbers = []; // reduce??
// let operators = []; // reduce??
let firstOperand = '';
let secondOperand = '';
let operator = '';
let waitingForSecondOperand = true;

const activeOpButton = "operation-btn-ACTIVE";

const displayResults = document.querySelector("#results");
const displayActions = document.querySelector("#actions");

const numberBtns = document.querySelectorAll(".number-btn");
const operationBtns = document.querySelectorAll(".operation-btn");
const clearBtn = document.querySelector("#clearBtn");
const signBtn = document.querySelector("#signBtn");
const backspaceBtn = document.querySelector("#backspaceBtn");
const decimalBtn = document.querySelector("#decimalBtn");
const equalsBtn = document.querySelector("#equalsBtn");

numberBtns.forEach( (button) => {
    button.addEventListener('click', inputNumber);
    button.addEventListener('click', checkSecondOperand);
})

function inputNumber(e) {
    num = e.target.textContent;
    if (waitingForSecondOperand) {
        firstOperand += num;
        displayResults.textContent = firstOperand;
    } else {
        secondOperand += num
        displayResults.textContent = secondOperand;
    }
}

operationBtns.forEach( (button) => {
    button.addEventListener('click', setOperator)
    button.addEventListener('click', checkSecondOperand);
})

function setOperator(e) {
    operator = e.target.textContent;
    if (isAnotherOperatorActive()) {
        console.log(true);  
        const oldActive = document.querySelector(`.${activeOpButton}`);
        oldActive.classList.remove(activeOpButton);

        e.target.classList.add(activeOpButton);
    } else {
        console.log(false);
        e.target.classList.add(activeOpButton);
    }
}

function isAnotherOperatorActive() {
    for (i = 0; i < operationBtns.length; i++) {
        if (operationBtns[i].classList.contains(activeOpButton)) return true;
    }
    return false;
}

function checkSecondOperand() {
    // truthy values -> strings are filled
    return (firstOperand && operator) ? waitingForSecondOperand = false : waitingForSecondOperand = true;
}
/*e

1. Press Number -> 
       firstOperand filled
       display firstOperand

2. Press Operation -> operator filled
       Activate operation button

3. If firstOperand and operator are filled -> waitingForSecondOperand false

4. If waitingForSecondOperand false
       Press Number ->
           secondOperand filled
           display secondOperand
   Else
       Press Operator ->
           return result
           repeat 3.

*/