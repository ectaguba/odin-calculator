let displayValue;
let input = '';
let numbers = []; // reduce??
let operators = []; // reduce??

const displayResults = document.querySelector("#results")

const clearBtn = document.querySelector("#clearBtn")
const signBtn = document.querySelector("#signBtn")
const deleteBtn = document.querySelector("#deleteBtn")

const divide = document.querySelector("#divisionBtn")
const multiply = document.querySelector("#multipilicationBtn")
const subtract = document.querySelector("#subtractionBtn")
const add = document.querySelector("#addBtn")
const equalsBtn = document.querySelector("#equalsBtn")

deleteBtn.addEventListener('click', () => popNumber())

equalsBtn.addEventListener('click', () => operate())

const numberBtns = document.querySelectorAll(".number-btn");

numberBtns.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent));
})

/*
divide.addEventListener('click')
multiply.addEventListener('click', multiply)
subtract.addEventListener('click', subtract)
add.addEventListener('click', add)
*/

function appendNumber(num) {
    input += num;
    displayResults.textContent = input;
}

function popNumber() {
    input = input.slice(0, input.length - 1)
    displayResults.textContent = input;
}

function operate(operator, a, b) {
    console.log("work");
}