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
      <div className="OuterContainer">
      <CodeMirrorContainer/>
      </div>
      {/* <CodeMirrorComponent readOnly={true}/> */}
      {/* <FirebaseMirror/> */}
    </div>
  );
}



class CodeMirrorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    // return <div className="Container">hello</div>;
    return (
    <div className="CodeMirrorContainer">
            <CodeMirrorComponent readOnly={false}/>
    </div>
    );
  }
}


export default App;
