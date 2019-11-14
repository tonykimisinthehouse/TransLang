import React from 'react';
import CodeMirrorComponent from './component/CodeMirror';
import logo from './logo.svg';
import './App.css';
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
        <p id="topic-title">Topic title</p>
        <div className="CodeMirrorContainer">
          <h1>Problem instructions</h1>
          <h3>Question prompt</h3>
          <div>
              <CodeMirrorComponent readOnly={false}/>
          </div>
          <TogetherJSButton/>
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

// function TogetherButton() {
//   function handleClick(e) {
//     window.TogetherJS(this);
//     return false;
//   }
//   return <button onClick={handleClick}>Start Collaborating</button>;
// }


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
      this.state.text = 'Finish Collaborating';
    }

    window.TogetherJS(this);
    return false;
  }

  render(){
      return(
          <div>
            <button onClick={ () => this.ToggleButton() }>
              {this.state.text}
            </button>
          </div>
      )
  }
}

export default App;