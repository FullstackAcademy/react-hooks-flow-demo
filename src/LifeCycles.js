
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

  const dispatchReducer = () => {
    dispatch({
      type: 'INCREMENT_NUMBER2'
    });
  };

  const context = useContext(AppContext);
  logLifeCycle('useContext', () => {
    console.log('context', context);
  });

  useEffect(() => {
    logLifeCycle('useEffect');
    return () => {
      logLifeCycle('useEffect Cleanup');
    }
  });

  useEffect(() => {
    logLifeCycle('useEffect 2');
    return () => {
      logLifeCycle('useEffect 2 Cleanup');
    }
  });

  useLayoutEffect(() => {
    logLifeCycle('useLayoutEffect');
    return () => {
      logLifeCycle('useLayoutEffect Cleanup');
    }
  })

  logLifeCycle('render', () => {
    console.log('props', props);
  });

  const increment = () => {
    setNum1(num1 + 1);
  }

  const memoizedSum = useMemo(() => {
    logLifeCycle('useMemo');
    return num1 + num2
  }, [num1, num2]);

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
      <button onClick={event => increment(event)}>Increment Number 1</button>
      <button onClick={event => dispatchReducer(event)}>Increment Number 2</button>
      <button onClick={event => setProduct(multiply())}>Multiply</button>
    </>
  );
}

export default LifeCycles;