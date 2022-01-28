
import React, {useState, useEffect, useContext, useReducer, useLayoutEffect, useMemo, useCallback } from 'react';
import { AppContext } from '.';

const lifecycleStyle = 'color: yellow; font-size: 16px'

let previousMultiply;

// This is just a logging function that makes the lifecycle log messages
// stand out with color. FANCY!
const logLifeCycle = (name, callback) => {
  console.group(`%c${name}`, lifecycleStyle);
  if (callback) {
    callback();
  }
  console.groupEnd();
}

function LifeCycles (props) {
  const [product, setProduct] = useState();
  const [num1, setNum1] = useState(() => {
    logLifeCycle('useState Initialize', () => {});
    return 0;
  });

  // This is a useReducer hook.
  // It's like useState but takes in a reducer function
  // and returns us a dispatch function to dispatch ACTIONS
  // This is very similar to Redux
  const [num2, dispatch] = useReducer((state, action) => {
    logLifeCycle('useReducer run', () => {
      console.log('state',state);
      console.log('action', action);
    });
    switch(action.type) {
      case 'INCREMENT_NUMBER2':
        return state + 1;
      default:
        return state;
    }
  }, 0, (initialState) => { 
    logLifeCycle('useReducer Initialize',() => {
      console.log('useReducer initializer Arg', initialState);
    });
    return 0;
  });

  // This dispatches the increment number 2 action
  const dispatchReducer = () => {
    dispatch({
      type: 'INCREMENT_NUMBER2'
    });
  };

  // This is a use Context hook. 
  // It allows us to access the value of a context provider
  // higher up in the component tree.
  const context = useContext(AppContext);
  logLifeCycle('useContext', () => {
    console.log('context', context);
  });

  // This is use Effect
  // This one is missing the dependency array
  // so it runs EVERYTIME the compoent renders
  useEffect(() => {
    logLifeCycle('useEffect');
    // This function is the cleanup, it runs when the component unmounts
    return () => {
      logLifeCycle('useEffect Cleanup');
    }
  });

  // This useEffect has an empty dependency array which means
  // it only runs the first time the component renders
  useEffect(() => {
    logLifeCycle('useEffect 2');
    return () => {
      logLifeCycle('useEffect 2 Cleanup');
    }
  }, []);

  // This is useLayoutEffect, it runs right before 
  // the component gets rendered by react to the DOM
  useLayoutEffect(() => {
    logLifeCycle('useLayoutEffect');
    return () => {
      logLifeCycle('useLayoutEffect Cleanup');
    }
  })

  // This is just logging that we are inside the main body of the
  // functional component
  logLifeCycle('render', () => {
    console.log('props', props);
  });

  // Helper function to increment Num1 by 1
  const increment = () => {
    setNum1(num1 + 1);
  }

  // This is a function that calculates the sum of 
  // num1 and num2.
  // the useMemo hook memoizes the value of the sum.
  // This function will only run when num1 and num2 change
  // because they are in the dependency array
  const memoizedSum = useMemo(() => {
    logLifeCycle('useMemo');
    return num1 + num2
  }, [num1, num2]);

  // This is similar to useMemo but instead it memoizes a
  // function definition.
  // Instead of defining the function on every render, it
  // only defines the new function when num1 and num2 change.
  const multiply = useCallback(() => {
    logLifeCycle('useCallback', () => {
      console.log('num1', num1);
      console.log('num2', num2);
    });
    return num1 * num2;
  }, [num1, num2]);

  console.log('useCallback', previousMultiply === multiply);

  previousMultiply = multiply;

  return (
    <>
      <h1>{props.title}</h1>
      <h2>Number 1 (useState): {num1}</h2>
      <h2>Number 2 (useReducer): {num2}</h2>
      <h2>Sum: {memoizedSum} </h2>
      <h2>Product: {product} </h2>
      <button onClick={event => increment(event)}>Increment Number 1 (using useState Hook)</button>
      <button onClick={event => dispatchReducer(event)}>Increment Number 2 (using useReducer Hook)</button>
      <button onClick={event => setProduct(multiply())}>Multiply (using useMemo Hook)</button>
    </>
  );
}

export default LifeCycles;