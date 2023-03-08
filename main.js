const buttons = document.querySelectorAll(".button")
const myOperator = document.getElementById('operator')
const myInput = document.getElementById('result') // stores first calculation value
let calculation = document.getElementById('sum') //show second calculation value
let myInputTwo = "" // stores the second calculation value

startCalculation()

function startCalculation() {
  myInput.value = 0
  // For each button -> return its ID when clicked
  buttons.forEach(button =>
    button.addEventListener('click', () => {
      switch (button.id) {
        // Clears everything
        case "C":
          onClickClear()
          break;

        // Deletes last number
        case "D":
          onClickDelete()
          break;

        // If this is second time the operator is clicked keep calculation going, else put first value into second value
        case "+":
        case "-":
        case "*":
        case "/":
          if (myInput.value === "") {
          }
          else if (myOperator.value === "+" || myOperator.value === "-" || myOperator.value === "*" || myOperator.value === "/") {
            doubleOperator()
          } else {
            setSecondInput()
          }
          onClickOperator(button.id)
          break;

        // calculates result
        case "=":
          if (myInput.value === "") {
          } else {
            onClickEquals()
            onClickOperator(button.id)
          }
          nanToError()
          break;

        // Allows Only 1 dot to be added
        case ".":
          if (myOperator.value === "=") {
          } else {
            oneDotMax()
          }
          break;

        default:
          if (myOperator.value === "=") {
          } else {
            oneZeroMax()
            errorReset()
            onClickNumber(button.id)
          }
      }
      showCalculation() // show second value if it exists
    }))
}

// After operator: the first input value will go to a second variable.
function setSecondInput() {
  myInputTwo = myInput.value
  myInput.value = ""
}

// Changes input.value when numbers are clicked. 
function onClickNumber(clickedNumber) {
  myInput.value += clickedNumber
}

// Changes operator value when operator is clicked.
function onClickOperator(clickedOperator) {
  myOperator.value = clickedOperator
}

// Resets calculator 
function onClickClear() {
  myInput.value = 0
  myInputTwo = ""
  myOperator.value = ""
}

// Deletes last number
function onClickDelete() {
  console.log(myInput.value);
  myInput.value = myInput.value.slice(0, -1)
}

// "=" will determine which operator was asked for and return correct calculation
function onClickEquals() {
  switch (myOperator.value) {
    case "+":
      myInput.value = parseFloat(myInputTwo) + parseFloat(myInput.value)
      break;
    case "-":
      myInput.value = parseFloat(myInputTwo) - parseFloat(myInput.value)
      break;
    case "*":
      myInput.value = parseFloat(myInputTwo) * parseFloat(myInput.value)
      break;
    case "/":
      myInput.value = parseFloat(myInputTwo) / parseFloat(myInput.value)
      break;
  }
  myInputTwo = ""
}

// Allows Only 1 dot to be added to myInput
function oneDotMax() {
  if (myInput.value.indexOf(".") === -1) {
    myInput.value += '.'
  }
}

// Cant use more than 1 zero in the beginning
function oneZeroMax() {
  if (myInput.value[0] === "0" && myInput.value[1] !== ".") {
    myInput.value = ""
  }
}

// Changes NaN to Error, example:  3 * . = Error
function nanToError() {
  if (myInput.value === "NaN") {
    myInput.value = "Error"
  }
}

// If Infinity is reached and 0-9 is pressed, resets values so user can keep going. 
function errorReset() {
  if (myInput.value === "Infinity" || myInput.value === "-Infinity" || myInput.value === "Error") {
    myInput.value = ""
    myOperator.value = ""
  }
}

// Makes calculator work without using "=", example:  3 * 3 * 3 * 3 = 81
function doubleOperator() {
  switch (myOperator.value) {
    case "+":
      myInputTwo = parseFloat(myInputTwo) + parseFloat(myInput.value)
      break;
    case "-":
      myInputTwo = parseFloat(myInputTwo) - parseFloat(myInput.value)
      break;
    case "*":
      myInputTwo = parseFloat(myInputTwo) * parseFloat(myInput.value)
      break;
    case "/":
      myInputTwo = parseFloat(myInputTwo) / parseFloat(myInput.value)
      break;
  }
  myInput.value = ""
}

// adds some text to show the second value of the calculator
function showCalculation() {
  if (myOperator.value === "=" || myInputTwo === "") {
    calculation.style.display = "none"
  } else {
    calculation.innerHTML = `${myOperator.value} ${myInputTwo}`
    calculation.style.display = "block"
  }
}