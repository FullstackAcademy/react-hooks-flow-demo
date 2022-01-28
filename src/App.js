import React, { useState } from 'react';
import LifeCycles from './LifeCycles';

function App() {
  const [lifeCycleShown, setLifeCycleShown] = useState(false);
  if (lifeCycleShown) {
    return (
      <>
        <button onClick={() => setLifeCycleShown(false)}>Unmount LifeCycles Component</button>
        <LifeCycles title="Welcome to the LifeCycles App" />
      </>
    )
  }

  return (
    <>
      <button onClick={() => setLifeCycleShown(true)}>Mount LifeCycles App</button>
    </>
  )
}

export default App;

