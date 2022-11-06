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
const equalsBtn = document.querySelector("#equalsBtn")

// Two event listeners -> one input
numberBtns.forEach( (button) => {
    button.addEventListener('click', setInput);
    button.addEventListener('click', checkSecondOperand);
    window.addEventListener('keypress', setInput);
    window.addEventListener('keypress', checkSecondOperand); 
})
operationBtns.forEach( (button) => {
    button.addEventListener('click', setInput);
    button.addEventListener('click', checkSecondOperand);
    window.addEventListener('keypress', setInput);
    window.addEventListener('keypress', checkSecondOperand); 
})

clearBtn.addEventListener('click', clear);
signBtn.addEventListener('click', changeSign);
backspaceBtn.addEventListener('click', popOperandVal);
equalsBtn.addEventListener('click', setOperator);

function setInput(e) {
    let input = '';

    // Setters
    switch (e.type) {
        case "keypress":
            input = e.key;
            break;
        case "click":
            input = e.target.textContent;
            break;
    }
    checkInput(input);
}

function checkInput(input) {
    // Consider alternative inputs
    if (input == "Enter") input = "=";
    if (input == "*") input = "X";
    // Passers
    switch (input) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            inputNumber(input);
            break;
        case "/":
        case "X":
        case "-":
        case "+":
        case "=":
            setOperator(input);
            break;
        default:
            break;
    }
}

function inputNumber(input) { 
    if (waitingForSecondOperand) {
        if (input === "." && firstOperand.includes(".")) return;
        firstOperand += input;
        displayResults.textContent = firstOperand;
    } else {
        if (input === "." && secondOperand.includes(".")) return;
        secondOperand += input;
        displayResults.textContent = secondOperand;
    }
}

function checkSecondOperand() {
    // Truthy values means strings are filled and no longer waiting
    return (firstOperand && operator) ? waitingForSecondOperand = false : waitingForSecondOperand = true;
}

// Setting operators should show results
// IMPORTANT: If second operator is truthy, calculate first THEN set new operator
function setOperator(input) {
    if (!firstOperand) firstOperand = '0'; // If operator is set after firstOperand
    if (firstOperand && secondOperand && operator) operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));

    // Set operator (but not to equal sign)
    if (input != "=") operator = input;
    
    // Check for other active buttons and remove their active class
    if (isAnotherOperatorActive() && input != "=") {
        const oldActive = document.querySelector(`.${activeOpButton}`);
        oldActive.classList.remove(activeOpButton);
    } 
    
    // Activate current operator
    operationBtns.forEach( (button) => {
        if (button.textContent.includes(input)) {
            button.classList.add(activeOpButton);
        }
    })
}

function isAnotherOperatorActive() {
    for (i = 0; i < operationBtns.length; i++) {
        if (operationBtns[i].classList.contains(activeOpButton)) return true;
    }
    return false;
} 

function clear() {
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
}

function changeSign() {
    if (!firstOperand) {
        displayResults.textContent = firstOperand;
    }

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

function popOperandVal() {
    if (waitingForSecondOperand && firstOperand) {
        firstOperand = firstOperand.slice(0, firstOperand.length - 1);
        // if whole string is gone, display 0 but keep value of operand
        (firstOperand === '') ? displayResults.textContent = '0' : displayResults.textContent = firstOperand;
    } 
    // not waiting and secondOperand is truthy
    else if (!waitingForSecondOperand && secondOperand) {
        secondOperand = secondOperand.slice(0, secondOperand.length - 1);
        (secondOperand === '') ? displayResults.textContent = '0' : displayResults.textContent = secondOperand;
    }
}

function operate(op, a, b) {
    let result = 0;
    switch (op) {
        case "/": 
            // divide by zero error
            if (b == 0) {
                document.getElementById("header").textContent = "Divide by 0 error";
                clear();
                return;
            } else {
                result = a / b;
                break;
            }
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
    console.log(`${firstOperand} ${operator} ${secondOperand} = ${result}\n `)

    // IMPORTANT: For repeated operations, assign result to first operand
    firstOperand = result;
    secondOperand = '';

    console.log("AFTER")
    console.log(`${firstOperand} ${operator} (second operand should be blank: ${secondOperand}) = ${result}\n `)
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