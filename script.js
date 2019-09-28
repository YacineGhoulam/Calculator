const buttons = document.querySelector(".container");
buttons.addEventListener("click", read);

const array = [];
array["num1"] = 0;
array["num2"] = 0;
array["op"] = "+";

let result = "0";

function read(e) {
  let current = document.querySelector(".current-result");
  let previous = document.querySelector(".previous-result");
  value_clicked = e.target.innerText;
  if (
    (isOperation(value_clicked) &&
      isOperation(previous.textContent.slice(-1))) ||
    e.target.tagName.toLowerCase() != "button" ||
    (isPoint(value_clicked) && isPoint(previous.textContent.slice(-1)))
  ) {
    return 0;
  }

  if (current.innerText == 0) {
    current.innerText = "";
  }

  if (value_clicked == "AC") {
    current.innerText = "0";
    previous.innerText = "";
    array["num1"] = 0;
    array["num2"] = 0;
    array["op"] = "+";
    result = "0";
  } else if (value_clicked == "DEL") {
    if (previous.innerText == "") {
      current.innerText = "0";
      array["num1"] = 0;
      array["num2"] = 0;
      array["op"] = "+";
      result = "0";
      return 0;
    }
    if (
      isOperation(previous.innerText.slice(-1)) ||
      isPoint(previous.innerText.slice(-1))
    ) {
      previous.innerText = previous.innerText.slice(0, -1);
      array["num1"] = Number(previous.innerText);
      array["num2"] = 0;
      array["op"] = "+";
      console.log(array);
      return 0;
    } else {
      previous.innerText = previous.innerText.slice(0, -1);
      array["num1"] = removeLastDigit(array["num1"]);
    }
  } else if (isOperation(value_clicked)) {
    //verificateOperation(current.innerText);

    array["num2"] = calculate(array);
    array["num1"] = 0;
    array["op"] = value_clicked;
    previous.innerText = array["num2"] + " " + value_clicked;
    result = array["num2"];

    /*array["num1"] = Number(current.innerText);
    array["num2"] = calculate(array);
    previous.innerText += current.innerText + " " + value_clicked;
    current.innerText = array["num2"];
    array["op"] = value_clicked;
    console.log(array["num2"]);*/
  } else if (value_clicked == "=") {
    if (!isOperation(previous.innerText)) {
      array["num1"] = calculate(array);
      array["num2"] = 0;
      result = array["num1"];
      previous.innerText = "";
    } else {
      return 0;
    }
  } else {
    if (previous.innerText == "") {
      current.innerText = "0";
      array["num1"] = 0;
      array["num2"] = 0;
      array["op"] = "+";
      result = "0";
    }
    let temp;
    if (isPoint(previous.innerText)) {
      temp = array["num1"] + "." + value_clicked;
    } else {
      temp = array["num1"] + value_clicked;
    }
    //console.log(temp.slice(-1));
    //console.log("temp " + temp);
    //console.log(Number("5.0"));
    array["num1"] = parseFloat(temp);
    //console.log("num " + array["num1"]);
    previous.innerText += " " + value_clicked;
    result = calculate(array);
  }
  console.log(array);
  current.innerText = result;
}

function calculate(array) {
  switch (array["op"]) {
    case "+":
      return array["num2"] + array["num1"];
      break;
    case "-":
      return array["num2"] - array["num1"];
      break;
    case "*":
      return array["num2"] * array["num1"];
      break;
    case "÷":
      return array["num2"] / array["num1"];
      break;

    default:
      return array["num2"];
      break;
  }
}

function verificateOperation(value) {
  if (value == ".") {
    return true;
  } else {
    return false;
  }
}

function removeLastDigit(num) {
  num = String(num).slice(0, -1);
  num = Number(num);
  return num;
}

function isOperation(value) {
  if (value == "+" || value == "-" || value == "*" || value == "÷") {
    return true;
  }
  return false;
}

function isPoint(string) {
  if (string.slice(-1) == ".") {
    return true;
  }
  return false;
}
function isEqual(string) {
  if (string.slice(-1) == "=") {
    return true;
  }
  return false;
}
