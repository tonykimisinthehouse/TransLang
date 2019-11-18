import React from 'react';
import CodeMirrorComponent from './component/CodeMirror';
import MultipleChoice from './MultipleChoice';
import Problem from './Problem';

import logo from './logo.svg';
import './App.css';
// import './MultipleChoice.css';

import Transcript from './Transcript'

import FirebaseMirror from './component/FirebaseMirror';


function App() {

  return (
    <div>
      <div className="App">
        <header className="App-header">Header</header>
        <div className="three-main-columns">
          <Resources/>
          <CodeMirrorContainer/>
          <Transcript/>
        </div>
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
    return (
      <div className="OuterContainer">
        <div className="CodeMirrorContainer">
          <TogetherJSButton/>
          <h1>Problem instructions</h1>
          <h3>Question prompt</h3>
          <div>
              <CodeMirrorComponent readOnly={false}/>
          </div>
          <Problem problemNumber={1}></Problem>
        </div>
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


class TogetherJSButton extends React.Component{
  constructor(props){
      super(props);
      this.state={
        togetherON: false,
        text: 'Start Collaborating'
      }
  }

  ToggleButton(){
    if (this.state.togetherON) {
      this.setState((currentState) => ({
        togetherON: !currentState.togetherON,
      }));
      this.state.text = 'Start Collaborating';
    } else {
      this.setState((currentState) => ({
        togetherON: !currentState.togetherON,
      }));
      this.state.text = 'Done Collaborating';
    }

    window.TogetherJS(this);
    return false;
  }

  render(){
      return(
          <div>
            <button className="TogetherJSButton" onClick={ () => this.ToggleButton() }>
              {this.state.text}
            </button>
          </div>
      )
  }
}

export default App;