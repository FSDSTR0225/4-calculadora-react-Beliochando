import { useState } from 'react';
import './App.css';
import './styles/OrderButtons.css';
import './styles/fonts.css';

// Establecemos las variables y los estados:
function App() {
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [lastOperation, setLastOperation] = useState('');

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const mathOperators = ['+', '-', '*', '/'];
  const displayValue = result || operation || '0';  //VARIABLE PARA MOSTRAR VALORES EN LA PANTALLA
  const displayLastOperation = lastOperation || '';  //VARIABLE PARA MOSTRAR SOLO LA OPERACIÓN CUANDO PULSAMOS EN RESULTADO

  
  //SELECTOR DE NÚMEROS

  const handleNumberClick = (number) => {
    if (result !== '') {
      setOperation(number);
      setResult(''); 
    } else {
      setOperation(operation + number);
    }
  };

  //SELECTOR DE OPERADORES

  const handleOperatorClick = (mathOperator) => {
    if (result !== '') {
      setOperation(result + mathOperator);
      setResult('');
    } else {
      setOperation(operation + mathOperator);
    }
  };

  //FUNCION PARA CALCULAR LAS OPERACIONES Y RESULTADOS

  const calculateResult = () => {
    try {
      const operations = operation.split(/([+\-*/])/);
      let currentResult = parseFloat(operations[0]);

      for (let i = 1; i < operations.length; i += 2) {
        const operator = operations[i];
        const nextNumber = parseFloat(operations[i + 1]);

        if (operator === '+') {
          currentResult += nextNumber;
        } else if (operator === '-') {
          currentResult -= nextNumber;
        } else if (operator === '*') {
          currentResult *= nextNumber;
        } else if (operator === '/') {
          if (nextNumber !== 0) {
            currentResult /= nextNumber;
          } else {
            setResult('Error');
            setOperation('');
            return;
          }
        }
      }

      let truncatedResult = currentResult.toFixed(4);
      setResult(parseFloat(truncatedResult));

      setLastOperation(operation.replace(/([+\-*/])/g, ' $1 ') + '=');
      setOperation('');
    } catch (error) {
      setResult('Error');
    }
  };

  //FUNCION PARA CALCULAR CON DECIMALES

const handleDecimal = () => {
  if (operation === '0') {
    setOperation('0.');
  } else if (operation.includes('+') || operation.includes('-') || operation.includes('*') || operation.includes('/')) {
    const lastOperand = operation.split(/([+\-*/])/).pop();
    if (!lastOperand.includes('.')) {
      setOperation(operation + '.');
    }
  } else if (!operation.includes('.')) {
    setOperation(operation + '.');
  }
};

  //FUNCION PARA RESETEAR OPERACIONES

  const handleReset = () => {
    setResult('Try again!');
    setLastOperation('');
    setTimeout(() => { //temporizador para que cambie el mensaje por 0.
      setResult('0');
      setOperation('');
    }, 500);
  };


//ESTRUCTURA QUE SE MUESTRA EN PANTALLA
  return (
    <div className="Calculator">
      <div className="Display">
        <div className="Screen">
          <div className="LastOperation">{displayLastOperation}</div>
          <div className="CurrentOperation">{displayValue}</div>
        </div>
    </div>
      <div className="ButtonsContainers">
        {numbers.map((number) => (
          <button key={number} className="button-number" onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
        {mathOperators.map((mathOperator) => (
          <button key={mathOperator} className="button-operator" onClick={() => handleOperatorClick(mathOperator)}>
            {mathOperator}
          </button>
        ))}
          <button className="button-equal" onClick={calculateResult}>=</button>
          <button className="button-decimal" onClick={handleDecimal}>.</button>
      </div>
      <div className="Reset"></div>
      <button className="button-reset" onClick={handleReset}>C</button>        
    </div>
  );
}

export default App;