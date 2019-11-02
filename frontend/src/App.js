import React from 'react';
import CodeMirrorComponent from './component/CodeMirror';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <CodeMirrorComponent readOnly={false}/>
    </div>
  );
}

export default App;
