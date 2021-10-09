/*************
           GLOBAL VARIABLES 
*************/
let displayValue = '0';
let firstNumber = null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let map = {}; // THIS IS TO STORE COMBIANTIONS KEY OF YOUR PC OR LAPTOP KEYBOARD;
const buttons = document.querySelectorAll('button');

/************** 
           THIS IS TO FILL THE OBJECT MAP. 
**************/
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
 }

/************** 
           THIS IS FUNCIONALITY FOR PC THE KEYBOARD. 
**************/ 
window.addEventListener('keydown', function(e){
    let tecla='';  // THIS IS THE SELECTED KEY
    /** HERE IS READING THE COMBINATIONS KEY OF PC KEYBOARD **/
    onkeydown();

    if(e.key === 'Enter'){
        tecla = document.querySelector(`button[data-key='187']`);
    }else if(map[16] === true && map[187] === true){
        tecla = document.querySelector('#plus');
    }else if(map[16] === true && map[53] === true){
        tecla = document.querySelector('#remainder'); 
    }else if(map[16] === true && map[54] === true){
        tecla = document.querySelector('#exponent'); 
    }else if(map[16] === true && map[56] === true){
        tecla = document.querySelector('#times');    
    }else if(map[191] ==true){
        tecla = document.querySelector('#divide');
    }else if(map[48] ==true){
        tecla = document.querySelector(`button[data-key='48']`);    
    }else{
        tecla = document.querySelector(`button[data-key='${e.keyCode}']`);
        
    }
    
    /** IF IS NULL THE KEY SELECTED THEN RETURN */
    if(tecla!==null)tecla.click(); else return ;
    
})

/************** 
           THIS IS THE FUNCTION TO UPDATE THE DISPLAY AREA. 
**************/
function updateDisplay() {
    const display = document.getElementById('user-input');
    display.innerText = displayValue;
    if(displayValue.length > 10) {
        display.innerText = displayValue.substring(0, 10);
    }
}
  
/************** 
           THIS IS THE FUNCTION TO SELECT A BUTTON FROM THE INTERFACE.
**************/
function SelectButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('digits')) {
                if (buttons[i].key === undefined) {
                    data = buttons[i].id;
                } else {
                    data = buttons[i].key;
                }
                getOperand(data);
                updateDisplay();
            } else if(buttons[i].classList.contains('operators')) {
                if (buttons[i].key === undefined) {
                    data = buttons[i].id;
                } else {
                    data = buttons[i].key;
                }
                getOperator(data);
            } else if(buttons[i].classList.contains('equals')) {
               
                SelectEqual();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                if (buttons[i].key === undefined) {
                    data = buttons[i].id;
                } else {
                    data = buttons[i].key;
                }
                getDecimal(data);
                updateDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                calcPercent(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                changeSign(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                updateDisplay();
        }
    )}
}

/************** 
           THIS IS THE FUNCTION TO GET THE OPERAND OR NUMBER 
           OR DIGIT OF THE BUTTON SELECTED BY USER. 
**************/
function getOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            //1ST INPUT - HANDLES FIRST OPERAND OR DIGIT
            displayValue = operand;
        } else if(displayValue === firstNumber) {
            //STARTS A NEW OPERATION AFTER SELECT THEEQUAL KEY OR ENTER KEY OF KEBOARD
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        //3RD/5TH INPUT - SECOND OPERAND OR DIGIT 
        if(displayValue === firstNumber) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

/************** 
           THIS IS THE FUNCTION TO GET OPERATOR OF THE 
           BUTTON SELECTED BY USER. 
**************/
function getOperator(operator) {
    
    if(displayValue === 'ERROR MATH'){
        clearDisplay();
        return;
    } 

    if(firstOperator != null && secondOperator === null) {
        //HANDLES SECOND OPERATOR
        secondOperator = operator;
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        appendHistory(firstNumber + ' ' + setOperator(firstOperator) + ' ' + secondNumber + ' = ' + result);   
        if(result === 'Error') {
            displayValue = 'ERROR MATH';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstNumber = displayValue;
        }
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        //NEW SECOND OPERATOR        
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        appendHistory(firstNumber + ' ' + setOperator(secondOperator) + ' ' + secondNumber + ' = ' + result);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstNumber = displayValue;
        result = null;
    } else { 
        //HANDLES FIRST OPERATOR
        firstOperator = operator;
        firstNumber = displayValue;
    }
}

/************** 
           THIS IS THE FUNCTION TO GET EQUAL ACTION 
           OR ENTER OF THE SELECTED BY USER. 
**************/
function SelectEqual() {
    //THE EQUAL KEY SELECTED DOSEN'T DISPLAY UNDEFINED 
    //RESULT BEFORE EXECUTE OPERATE() FUNCTION
    if(displayValue === 'ERROR MATH'){
        clearDisplay();
        return;
    }
    
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        //HANDLES FINAL RESULT 
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        appendHistory(firstNumber + ' ' + setOperator(secondOperator) + ' ' + secondNumber + ' = ' + result);
        if(result === 'Error') {
            displayValue = 'ERROR MATH';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //HANDLES FIRST OPERATION
        secondNumber = displayValue;       
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        appendHistory(firstNumber + ' ' + setOperator(firstOperator) + ' ' + secondNumber + ' = ' + result);
        if(result === 'Error') {
            displayValue = 'ERROR MATH';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
    
}

/************** 
           THIS IS THE FUNCTION TO FILL IN THE MODAL 2, HISTORY AREA.
**************/
function appendHistory(info) {
    const history = document.getElementById("history");
    const note = document.createElement("li");
    note.innerHTML=info;
    history.appendChild(note);
  }

/************** 
           THIS IS THE FUNCIONALITY TO REMOVE THE CONTENT HISTORY. 
**************/
const remove  = document.getElementById("removeHistory");
remove.addEventListener('click',()=>{
    const history = document.getElementById("history");  
    history.innerHTML='';
})  

/************** 
           THIS IS THE FUNCTION TO GET DOT OR POINT OF 
           THE DECIMAL, SELECTED BY USER. 
**************/
function getDecimal(dot) {
    if(displayValue === firstNumber || displayValue === secondNumber) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

/************** 
           THIS IS THE FUNCTION TO CALCULATE PERCENT OF THE 
           NUMBER SELECTED BY USER. 
**************/
function calcPercent(num) {
    displayValue = (num/100).toString();
    appendHistory(num + '% =' + displayValue);
}

/************** 
           THIS IS THE FUNCTION TO CHANGE THE SIGN OF THE 
           NUMBER SELECTED BY USER. 
**************/
function changeSign(num) {
    displayValue = (num * -1).toString();
    appendHistory(num + '*(-1) = '+ displayValue);
}

/************** 
           THIS IS THE FUNCTION TO CLEAR THE DISPLAY AREA. 
**************/
function clearDisplay() {
    displayValue = '0';
    firstNumber = null;
    secondNumber = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

/************** 
           THIS IS THE FUNCTION TO BACK A SPACE. 
**************/
function inputBackspace() {
    if(firstNumber != null) {
        firstNumber = null;
        updateDisplay();
    }
}

/************** 
           THIS IS THE FUNCTION TO FORMAT THE OPERATOR 
           IN THE CONTENT HISTORY.
**************/
function setOperator(op){
    if(op === 'plus' ) {
        return '+';
    } else if(op === 'minus') {
        return '-';
    } else if(op === 'times') {
        return '*';
    } else if(op === 'divide') {
        return '/';
    }else if(op === 'exponent') {
        return '^';
    }
}

/************** 
           THIS IS THE FUNCTION TO EXECUTE OPERATION 
           SELECTED BY USER. 
**************/
function operate(x, y, op) {

    if(op === '+' || op === 'plus' ) {
        return x + y;
    } else if(op === '-' || op === 'minus') {
        return x - y;
    } else if(op === '*' || op === 'times') {
        return x * y;
    } else if(op === '/' || op === 'divide') {
        if(y === 0) {
            return 'Error';
        } else {
        return x / y;
        }
    }else if(op === '^' || op === 'exponent') {
        if(x === 0 && y === 0){
            return 'Error';
        }else{
            return Math.pow(x,y); 
        }
        
    }
}

/************** 
           THIS IS THE FUNCTION ROUND ACCURATE OF RESULT AND 
           USE NOTATION SCIENTIFC FOR FORMAT. 
**************/
function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

/************** 
           HERE IS INVOKED THE FUNCTION THAT UPDATES THE 
           AREA WHERE THE RESULTS IS SHOWN 
**************/
updateDisplay();

/************** 
           HERE IS INVOKED THE FUNCTION THAT ALLOWS TO OBTAIN 
           EACH NUMBER, OPERATOR OR EQUAL KEY FROM THE CALCULATOR INTERFACE. 
**************/
SelectButton();