import { useState } from 'react';
import './App.css';

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
      setResult(currentResult);
      setLastOperation(operation);
      setOperation('');
    } catch (error) {
      setResult('Error');
    }
  };

  const handleReset = () => {
    setResult('Try again!');
    setLastOperation('');
    setTimeout(() => { //temporizador para que cambie el mensaje por 0.
      setResult('0');
      setOperation('');
    }, 1000);
  };


//ESTRUCTURA QUE SE MUESTRA EN PANTALLA
  return (
    <div className="Calculator">
      <div className="Display">
        <div className="Screen">
        <div>{displayLastOperation}</div>
        <div>{displayValue}</div> 
        </div>
        <div className="ButtonsContainers">
          <div className="buttonNumbers">
            {numbers.map((number) => (
              <button key={number} onClick={() => handleNumberClick(number)}>
                {number}
              </button>
            ))}
          </div>
          <div className="buttonOperators">
            {mathOperators.map((mathOperator) => (
              <button key={mathOperator} onClick={() => handleOperatorClick(mathOperator)}>
                {mathOperator}
              </button>
            ))}
          </div>
          <button onClick={calculateResult}>=</button>  {}
          <button onClick={handleReset}>C</button>
        </div>
      </div>
    </div>
  );
}

export default App;
