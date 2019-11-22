import React from 'react';
import CodeMirrorComponent from './component/CodeMirror';
import MultipleChoice from './MultipleChoice';
import Problem from './Problem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import logo from './logo.svg';
import './App.css';
// import './MultipleChoice.css';

import Transcript from './Transcript'



function App() {

  return (
    
    <div>
      <div className="App">
        <header className="App-header">EdTech CS 1301 Tracing</header>
        <div className="three-main-columns">
          <Resources/>
          <CodeMirrorContainer/>
          <Transcript />
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
          <h2></h2>
          <div>
              <CodeMirrorComponent readOnly={false}/>
          </div>
        </div>
        <Router>
          <Switch>
            <Route path="/q1-1">
              <div className="ProblemContainer">
                <Problem nextQuestion="q1-2" problemNumber={1}></Problem>
              </div>
            </Route>
            <Route path="/q1-2">
             <div className="ProblemContainer">
                <Problem problemNumber={2}></Problem>
              </div>
            </Route>
          </Switch>
        </Router>


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