const app = {

  currentOperandText: '',
  secondOperandText: '',
  operation: '',

  init: () => {

    container = document.querySelector('.container');
    box = document.querySelector('.box');
    calculator = document.querySelector('.list');
    currentOperand = document.querySelector('.current-operand');
    secondOperand = document.querySelector('.previous-operand');

    app.createNumbers();
    app.addOperatorsAfterNumbers();


    listButton = document.querySelectorAll('.list-numbers');
    listButton.forEach(element => {
      element.addEventListener('click', app.getCurrentOperandValues);
    });

    listOperators = document.querySelectorAll('.list-operators');
    listOperators.forEach(element => {
      element.addEventListener('click', app.getOperators);
    });

    clearButton = document.querySelector('.list-clear');
    clearButton.addEventListener('click', app.clearAll);

    equalButton = document.querySelector('.list-equal');
    equalButton.addEventListener('click', app.calculate)
    
  },

  calculate: () => {

    let calculated;

    const prev = parseFloat(app.secondOperandText);
    const current = parseFloat(app.currentOperandText);

    if (isNaN(prev) || isNaN(current)) return;

    switch (app.operation) {
      case '+':
        calculated = prev + current;
        break
      case '-':
        calculated = prev - current;
        break
      case '*':
        calculated = prev * current;
        break
      case '/':
        calculated = prev / current;
        break
      default: 
        return;
    }

    app.currentOperandText = calculated;
    app.operation = '';
    app.secondOperandText = '';

    app.updateDisplay();
  },

  clearAll: () => {

    app.currentOperandText = '';
    app.secondOperandText = '';
    app.operation = '';

    app.updateDisplay();
  },

  updateDisplay: () => {

    currentOperand.innerText = app.currentOperandText;
    secondOperand.innerText = app.secondOperandText;

    if (app.operation !== '') {
      secondOperand.innerText = app.secondOperandText + app.operation;
    }

  },

  getOperators: (evt) => {

    if (app.currentOperandText === '') return;
    if (app.secondOperandText !== '') { 
      app.calculate();
    }

    const currentOperator = evt.currentTarget; 
    const currentValue = currentOperator.textContent;

    app.operation = currentValue;
    app.secondOperandText = app.currentOperandText;
    app.currentOperandText = '';

    app.updateDisplay();

  },

  getCurrentOperandValues: (evt) => {

    const currentNumbers = evt.currentTarget;
    const currentValue = currentNumbers.textContent;

    if (currentValue === '.' && app.currentOperandText.includes('.')) return;

    app.currentOperandText = app.currentOperandText.toString() + currentValue.toString();

    app.updateDisplay();

  },

  createNumbers: () => {

    let i = 0;
    let number = -1;

    for (let i = 0; i < 10 ; i++) {

      number++;

      const button = document.createElement('div');
      calculator.appendChild(button);

      button.classList.add('list-numbers');
      button.textContent = number;

    }

    const dotButton = document.createElement('div');
    calculator.appendChild(dotButton);

    dotButton.classList.add('list-numbers');
    dotButton.textContent = '.';

  },

  addOperatorsAfterNumbers: () => {

    const operatorsContainer = document.createElement('div');
    operatorsContainer.classList.add('operators');
    box.appendChild(operatorsContainer);

    const addButton = document.createElement('div');
    const minusButton = document.createElement('div');
    const multiButton = document.createElement('div');
    const diviButton = document.createElement('div');
    const clearAll = document.createElement('div');
    const equalButton = document.createElement('div');

    operatorsContainer.appendChild(addButton).textContent = '+';
    addButton.classList.add('list-operators');

    operatorsContainer.appendChild(minusButton).textContent = '-';
    minusButton.classList.add('list-operators');

    operatorsContainer.appendChild(multiButton).textContent = '*';
    multiButton.classList.add('list-operators');

    operatorsContainer.appendChild(diviButton).textContent = '/';
    diviButton.classList.add('list-operators');

    container.appendChild(clearAll).textContent = 'CA';
    clearAll.classList.add('list-clear');

    container.appendChild(equalButton).textContent = '=';
    equalButton.classList.add('list-equal');
    

  },

};

document.addEventListener('DOMContentLoaded', app.init);
