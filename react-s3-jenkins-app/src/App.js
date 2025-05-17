import React from 'react';
import './App.css';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React Application</h1>
        <p>Welcome to my S3-hosted React application!</p>
        <Counter />
      </header>
    </div>
  );
}

export default App;