class Calculator {
  constructor(currentOperandTextElement, previousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;
    this.result = 0;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.op = undefined;
  }

  equal() {
    if (this.calculate() && this.previousOperand != "") {
      this.result = this.calculate();
      this.currentOperand = this.result;
      this.previousOperand = "";
    }
  }

  delete() {
    console.log("delte");
    this.currentOperand = this.currentOperandTextElement.innerText.slice(0, -1);
  }
  appendNumber(number) {
    if (number == "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number.toString();
  }

  operation(op) {
    if (currentOperandTextElement.innerText == "") {
      return;
    }
    this.currentOperand = "";
    this.result = this.calculate();
    this.op = op;
    if (this.previousOperand != "") {
      this.previousOperand = `${this.result} ${this.op}`;
    } else {
      this.previousOperand = `${this.currentOperandTextElement.innerText} ${this.op}`;
    }
    /*console.log(this.currentOperand);
    console.log(this.previousOperand);
    console.log(this.result);*/
  }
  calculate() {
    let num1 = parseFloat(this.currentOperandTextElement.innerText);
    let num2 = parseFloat(this.previousOperandTextElement.innerText);
    switch (this.op) {
      case "+":
        console.log("+");
        return num1 + num2;
        break;
      case "-":
        console.log("-");
        return num2 - num1;
        break;
      case "*":
        console.log("*");
        return num1 * num2;
        break;
      case "÷":
        console.log("/");
        return num2 / num1;
        break;

      default:
        return this.result;
        break;
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const operationButtons = document.querySelectorAll("[operation-button]");
const numberButtons = document.querySelectorAll("[number-button]");
const deleteButton = document.querySelector("[delete-button]");
const clearAllButton = document.querySelector("[clear-all-button]");
const equalButton = document.querySelector("[equal-button]");
const previousOperandTextElement = document.querySelector("[previous-operand]");
const currentOperandTextElement = document.querySelector("[current-operand]");

const calculator = new Calculator(
  currentOperandTextElement,
  previousOperandTextElement
);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.operation(button.innerText);
    calculator.updateDisplay();
  });
});

clearAllButton.addEventListener("click", () => {
  calculator.clearAll();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
  calculator.equal();
  calculator.updateDisplay();
});
