"use strict";

let displayValue

let firstValue = 0;
let resultsOnScreen = 0;
let activeOperator = 0;

const BUTTONS = document.querySelectorAll('button');


//use the .forEach method to iterate through each button
BUTTONS.forEach((button) => {
    //and for each one add a 'click' listener
    if (!isNaN(button.id)) {
        button.addEventListener('click', () => {
            if (document.getElementById("display").textContent == 0) {
                clearDisplay();
                updateDisplay(button.id);
            }
            else if (document.getElementById("display").textContent != "") {
                updateDisplay(button.id);
            }
        });
    }
    else if (isNaN(button.id)) {
        button.addEventListener('click', () => {
            handleOperator(button.id);
        });
    }
  });


function handleOperator(id) {
    if (id === "AC") {
        clearDisplay();
        clearAll();
    }
    else if (isOperatorBasic(id)) {
        if (firstValue == 0) {
            firstValue = document.getElementById("display").textContent;
            activeOperator = id;
            clearDisplay();
        }
        else if (firstValue != 0) {
            activeOperator = 0;
            if (resultsOnScreen != 0) {
                firstValue = document.getElementById("display").textContent;
                operate(id, +firstValue, +document.getElementById("display").textContent);
            }
        }
    }

    else if (id === "calculate" && firstValue != 0 && activeOperator != 0) {
        operate(activeOperator, +firstValue, +document.getElementById("display").textContent);
        activeOperator = 0;
    }
}

function clearAll() {
    firstValue = 0;
    resultsOnScreen = 0;
    activeOperator = 0;
    document.getElementById("display").textContent = 0;
}

function clearDisplay() {
    document.getElementById("display").textContent = "";
}

function updateDisplay(result) {
    let currentValue = document.getElementById("display").textContent
    document.getElementById("display").textContent = currentValue + result;
    displayValue = currentValue + result;
}

function isOperatorBasic(id) {
    if (id === "plus" || id === "minus" || id === "multiply" || id === "divide") {
        return true;
    }
}


function operate (operator, parameter1, parameter2) {
    let result;
    if (operator == "plus") {
        result = add(parameter1, parameter2);
    }
    else if (operator == "minus") {
        result = substract(parameter1, parameter2);
    }
    else if (operator == "multiply") {
        result = multiply(parameter1, parameter2);
    }
    else if (operator == "divide") {
        result = divide(parameter1, parameter2);
    }
    clearDisplay();
    updateDisplay (result);
    firstValue = 0;
    resultsOnScreen = result;
}

function add (parameter1, parameter2) {
    return parameter1 + parameter2;
}

function substract (parameter1, parameter2) {
    return parameter1 - parameter2;
}

function multiply (parameter1, parameter2) {
    return parameter1 * parameter2;
}

function divide (parameter1, parameter2) {
    return parameter1 / parameter2;
}