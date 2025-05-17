import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h2>Counter Component</h2>
      <div className="counter-display">
        <p>Current Count: <span className="count-value">{count}</span></p>
      </div>
      <div className="counter-controls">
        <button 
          className="counter-button increment"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button 
          className="counter-button decrement"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
        <button 
          className="counter-button reset"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
