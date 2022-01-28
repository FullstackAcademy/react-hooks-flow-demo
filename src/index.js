import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export const AppContext = createContext();
const contextValue = 'Hello World';

ReactDOM.render(
  <React.StrictMode>
    <AppContext.Provider value={contextValue}>
      <App />
    </AppContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
