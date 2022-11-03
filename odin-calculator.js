// let numbers = []; // reduce??
// let operators = []; // reduce??
let firstOperand = '';
let secondOperand = '';
let operator = '';
let waitingForSecondOperand = true;

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

operationBtns.forEach( (button) => {
    button.addEventListener('click', setOperator)
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

function checkSecondOperand() {
    return (firstOperand && operator) ? waitingForSecondOperand = false : waitingForSecondOperand = true;
}
/*e

1. Press Number -> 
       firstOperand filled
       display firstOperand

2. Press Operation -> operator filled
       Activate operation button

3. If firstOperand and operator are filled -> waitingForSecondOperand false

4. If waitingForSecondOperand true
       Press Number ->
           secondOperand filled
           display secondOperand
       Press Operator ->
           return result
           repeat 3.

*/