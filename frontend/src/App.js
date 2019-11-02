import React from 'react';
import CodeMirrorComponent from './component/CodeMirror';
import logo from './logo.svg';
import './App.css';
import FirebaseMirror from './component/FirebaseMirror';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <CodeMirrorComponent readOnly={false}/>
      <FirebaseMirror/>
    </div>
  );
}

export default App;
