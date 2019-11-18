import React from 'react';
import './MultipleChoice.css';

class MultipleChoice extends React.Component {
    constructor() {
      super();

      this.state = {
        choice: '',
        tries: 0,
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({
        choice: event.target.value
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      this.state.tries++;
      if (this.state.tries <=2) {
        alert(`${this.state.choice == this.props.correctChoice ? "Correct!" : "Try Again"}`);
      } else {
        alert(`${this.state.choice == this.props.correctChoice ? "Correct! The answer is" : "The correct answer is:"} ${this.props.answer}`);
      }
    }

    render() {
      return (
      <div className="answer-choices">
          <input
            type="radio"
            value="A"
            checked={this.state.choice === "A"}
            onChange={this.handleChange}
          />
          <label htmlFor="option-A">{this.props.choiceA}</label>

          <input
            id="answerChoiceB"
            type="radio"
            value="B"
            checked={this.state.choice === "B"}
            onChange={this.handleChange}
          />
          <label htmlFor="option-B">{this.props.choiceB}</label>

          <input
            id="answerChoiceC"
            type="radio"
            value="C"
            checked={this.state.choice === "C"}
            onChange={this.handleChange}
          />
          <label htmlFor="option-C">{this.props.choiceC}</label>

          <input
            id="answerChoiceD"
            type="radio"
            value="D"
            checked={this.state.choice === "D"}
            onChange={this.handleChange}
          />
          <label htmlFor="option-D">{this.props.choiceD}</label>

          <button type="submit" className="submit-button" onClick={this.handleSubmit}>Submit your answer!</button>
        </div>
       )
    }
  }

  export default MultipleChoice;
  // ReactDOM.render(<MultipleChoice />, document.getElementById('app'));