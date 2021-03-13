import React, { useEffect, useState } from 'react';

import CalcButton from './../components/CalcButton';

const CalcApp = () => {
  const [display, setDisplay] = useState('0');
  const [storedVal, setStoredVal] = useState('');
  const [operator, setOperator] = useState(['', '', false]);

  const reset = () => {
    setDisplay('0');
    setStoredVal('');
    setOperator(['', '', false]);
  }

  useEffect(() => {
    console.log(operator);
    console.log({
      'display': display,
      'store': storedVal,
      'operator': operator
    });
    if (operator[1] !== '' && storedVal && !operator[2]) {
      let lVal, rVal, ans;
      if (operator[1] !== '==') {
        console.log('asdf');
        lVal = storedVal;
        rVal = display;
      }
      else {
        console.log('123');
        lVal = display;
        rVal = storedVal;
      }
      switch (operator[0]) {
        case '':
          ans = rVal;
          break
        case '+':
          ans = (parseFloat(lVal) + parseFloat(rVal)).toString();
          break
        case '-':
          ans = (parseFloat(lVal) - parseFloat(rVal)).toString();
          break
        case 'x':
          ans = (parseFloat(lVal) * parseFloat(rVal)).toString();
          break
        case '÷':
          ans = (parseFloat(lVal) / parseFloat(rVal) ).toString();
          break
        default:
          ans = rVal;
          break
      }
      if (operator[1] !== '==') {
        if (operator[1] === '=') setStoredVal(rVal);
        else setStoredVal(ans);
      }
      setDisplay(ans);
    }
    else if (!storedVal && !operator[2]) {
      setStoredVal(display);
    }
  // eslint-disable-next-line
  }, [operator]);

  const showNotImplemented = () => console.warn('This function is not implemented yet. (CalcApp)');

  const evaluate = (val) => {
    if (!storedVal) {
      setOperator(['', val, false])
      return;
    }
    if (operator[1] === '=' || operator[1] === '==') {
      setOperator(['', val, false])
    }
    else operator[1]? setOperator([operator[0], val, true]): setOperator([operator[0], val, false])
  }

  const addNumber = (val) => {
    if (val === '.') {
      console.log(display.indexOf('.'));
      if (display.indexOf('.') === -1) {
        operator[1]? setDisplay('0.') : setDisplay( display + val );
      }
    }
    else {
      if (display === '0' || operator[1]) setDisplay(val);
      else setDisplay( display + val);
    }
    if (operator[1] !== '') setOperator([operator[1], '', false])
  }

  return (
    <div className="calc-app">
      <div className="calc-container">
        <div className="calc-output">
          <div className="calc-display"> {display.substring(0, 8)} </div>
        </div>
        <div className="calc-row">
          <CalcButton onClick={ () => reset() }>AC</CalcButton>
          <CalcButton
            onClick={ () => {
              if (display[0] === '-') setDisplay( display.substring(1) );
              else setDisplay( '-' + display );
            }}
          >+/-</CalcButton>
          <CalcButton onClick={ () => showNotImplemented() }>%</CalcButton>
          <CalcButton
            className="calc-operator"
            onClick={ () => {
              evaluate('÷');
            }}
          >÷</CalcButton>
        </div>
        <div className="calc-row">
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('7') }
          >7</CalcButton>
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('8') }
          >8</CalcButton>
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('9') }
          >9</CalcButton>
          <CalcButton
            className="calc-operator"
            onClick={ () => {
              evaluate('x');
            }}
          >x</CalcButton>
        </div>
        <div className="calc-row">
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('4') }
          >4</CalcButton>
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('5') }
          >5</CalcButton>
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('6') }
          >6</CalcButton>
          <CalcButton
            className="calc-operator"
            onClick={ () => {
              evaluate('-');
            }}
          >-</CalcButton>
        </div>
        <div className="calc-row">
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('1') }
          >1</CalcButton>
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('2') }
          >2</CalcButton>
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('3') }
          >3</CalcButton>
          <CalcButton
            className="calc-operator"
            onClick={ () => {
              evaluate('+');
            }}
          >+</CalcButton>
        </div>
        <div className="calc-row">
          <CalcButton
            className="calc-number bigger-btn"
            onClick={ () => addNumber('0') }
          >0</CalcButton>
          <CalcButton
            className="calc-number"
            onClick={ () => addNumber('.')  }
          >.</CalcButton>
          <CalcButton
            className="calc-operator"
            onClick={ () => {
              if (operator[1] === '') {console.log('1'); setOperator([operator[0], '=', false]);}
              else if (operator[1] === '=' || operator[1] === '==') {console.log('2');setOperator([operator[0], '==', false]);}
              else setOperator([operator[1], '=', false]);
            } }
          >=</CalcButton>
        </div>
      </div>
    </div>
  );
}

export default CalcApp;
