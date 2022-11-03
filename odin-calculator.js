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
        secondOperand += num;
        displayResults.textContent = secondOperand;
    }
}

operationBtns.forEach( (button) => {
    button.addEventListener('click', setOperator);
    button.addEventListener('click', checkSecondOperand);
})

clearBtn.addEventListener('click', () => {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    waitingForSecondOperand = true;
    displayResults.textContent = '0';

    for (i = 0; i < operationBtns.length; i++) {
        if (operationBtns[i].classList.contains(activeOpButton)) {
            operationBtns[i].classList.remove(activeOpButton);
        }
    }
    
    console.log("CLEARED");
})

signBtn.addEventListener('click', changeSign);
function changeSign(e) {
    if (waitingForSecondOperand) {
        tempInt = parseFloat(firstOperand);
        firstOperand = (tempInt * -1).toString();
        displayResults.textContent = firstOperand;
    } 
    // not waiting and secondOperand is truthy
    else if (!waitingForSecondOperand && secondOperand) {
        tempInt = parseFloat(secondOperand);
        secondOperand = (tempInt * -1).toString();
        displayResults.textContent = secondOperand;
    }
}

function setOperator(e) {
    // Result of first and second operands
    if (firstOperand && secondOperand && operator) {
        operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
    }

    // IMPORTANT: If second operator is truthy, calculate first THEN set new operator
    operator = e.target.textContent;
    if (isAnotherOperatorActive()) {
        const oldActive = document.querySelector(`.${activeOpButton}`);
        oldActive.classList.remove(activeOpButton);

        e.target.classList.add(activeOpButton);
    } else {
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

function operate(op, a, b) {
    let result = 0;
    switch (op) {
        case "/": 
            result = a / b;
            break;
        case "X":
            result = a * b;
            break;
        case "-": 
            result = a - b;
            break;
        case "+": 
            result = a + b;
            break;
    }
    result = result.toString();
    displayResults.textContent = result;

    console.log("BEFORE")
    console.log(`${firstOperand} ${operator} ${secondOperand} = ${result}`)
    console.log("")

    firstOperand = result;
    secondOperand = '';

    console.log("AFTER")
    console.log(`${firstOperand} ${operator} (second operand: ${secondOperand}) = ${result}`)
}
/*

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

Operator
    calculate and return result
    assign result to firstOperand
    reset second Operand
*/