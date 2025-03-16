import { useState } from 'react';
import './App.css';

// Establecemos las variables y los estados:
function App() {
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [fullOperation, setFullOperation] = useState(''); //Este estado almacena todas las operaciones pero no se usa como función.

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const mathOperators = ['+', '-', '*', '/'];
  const displayValue = result || operation || '0';  //VARIABLE PARA MOSTRAR VALORES EN LA PANTALLA

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
          return;
        }
      }
    }
    setResult(currentResult);
    setFullOperation(operation + '=' + currentResult);
    setOperation('');
  };

  const handleReset = () => {
    setResult('');  
    setOperation('');  
  };


//ESTRUCTURA QUE SE MUESTRA EN PANTALLA
  return (
    <div className="Calculator">
      <div className="Display">
        <div className="Screen">
          {displayValue}  {}
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
