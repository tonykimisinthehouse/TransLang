import React from 'react';
import './MultipleChoice.css';
import './index.css';

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
        alert(`${this.state.choice === this.props.correctChoice ? "Correct!" : "Try Again"}`);
      } else {
        alert(`${this.state.choice === this.props.correctChoice ? "Correct! The answer is" : "The correct answer is:"} ${this.props.answer}`);
      }
    }

    render() {
      return (
      <div className="answer-choices">
      <form>


      <label htmlFor={this.props.id + "a"} className="form-check">{this.props.choiceA}
          <input
            id={this.props.id + "a"}
            type="radio"
            name="radio"
            value="A"
            onChange={this.handleChange}
          />
          <span className="checkmark"></span>
        </label>

        <label htmlFor={this.props.id + "b"}  className="form-check">{this.props.choiceB}
            <input
              id={this.props.id + "b"}
              type="radio"
              name="radio"
              value="B"
              onChange={this.handleChange}
            />
            <span className="checkmark"></span>
          </label>

        <label htmlFor={this.props.id + "c"}  className="form-check">{this.props.choiceC}
          <input
            id={this.props.id + "c"}
            type="radio"
            name="radio"
            value="C"
            onChange={this.handleChange}
          />
          <span className="checkmark"></span>
        </label>

      <label htmlFor={this.props.id + "d"} className="form-check">{this.props.choiceD}
          <input
            id={this.props.id + "d"}
            type="radio"
            name="radio"
            value="D"
            onChange={this.handleChange}
          />
          <span className="checkmark"></span>
      </label>
      </form>
          <button type="submit" className="submit-button" onClick={this.handleSubmit}>Submit</button>
        </div>
       )
    }
  }

  export default MultipleChoice;
  // ReactDOM.render(<MultipleChoice />, document.getElementById('app'));