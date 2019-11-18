import React from 'react';
import Question from './components/instructions/Question';
import DrawArea from './components/CodeEditor/DrawArea';

function App() {
  return (
    <div className="App">
      <Question/>
      <DrawArea/>
    </div>
  );
}

export default App;
