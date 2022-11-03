let input = '';
let numbers = []; // reduce??
let operators = []; // reduce??
let currentOperation = '';

const displayResults = document.querySelector("#results");
const displayActions = document.querySelector("#actions");

// Number buttons
const numberBtns = document.querySelectorAll(".number-btn");
numberBtns.forEach((button) => {
    button.addEventListener('click', appendInput);
})

const clearBtn = document.querySelector("#clearBtn");
const signBtn = document.querySelector("#signBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const decimalBtn = document.querySelector("#decimalBtn");

decimalBtn.addEventListener('click', appendInput);
deleteBtn.addEventListener('click', popInput);

// Operation buttons
const operationBtns = document.querySelectorAll(".operation-btn");
operationBtns.forEach( (button) => {

})

const divide = document.querySelector("#divisionBtn");
const multiply = document.querySelector("#multiplicationBtn");
const subtract = document.querySelector("#subtractionBtn");
const add = document.querySelector("#additionBtn");
const equalsBtn = document.querySelector("#equalsBtn");

decimalBtn.addEventListener('click', appendInput);
deleteBtn.addEventListener('click', popInput);
equalsBtn.addEventListener('click', () => operate());

function appendInput(num) { // num passed as event
    input += num.target.textContent;
    displayResults.textContent = input;
}

function popInput() {
    input = input.slice(0, input.length - 1);
    displayResults.textContent = input;
}

function setOperation(newOp) {

}

function operate(operator, a, b) {
    console.log("work");
}