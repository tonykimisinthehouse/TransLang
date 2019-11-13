import React from 'react';
import CodeMirrorComponent from './component/CodeMirror';
import logo from './logo.svg';
import './App.css';
import FirebaseMirror from './component/FirebaseMirror';

function App() {
  return (
    <div>
      <header className="App-header"> Header</header>
      <div className="App">
        <Resources/>
        <CodeMirrorContainer/>
        <Transcript/>
      </div>
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
      <div className="OuterContainer">
      <p id="topic-title">Topic title</p>
      <div className="CodeMirrorContainer">
        <h1>Problem instructions</h1>
        <h3>Question prompt</h3>
        <div>
            <CodeMirrorComponent readOnly={false}/>
        </div>
        <button>Next</button>
      </div>
      </div>
    );
  }
}

class Transcript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    // return <div className="Container">hello</div>;
    return (
        <div className="Transcript">
                <p>Mariana: alsdjfk
                  Tony: ajskdfjl
                </p>
        </div>
    );
  }
}

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
        <div className="Resources">
                <p>For Loops suggested resources</p>
        </div>
    );
  }
}

export default App;