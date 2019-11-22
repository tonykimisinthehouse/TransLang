import React from 'react';
import MultipleChoice from './MultipleChoice';

import {
  Link
} from "react-router-dom";

class Problem extends React.Component {
    constructor() {
      super();

      this.state = {
      };
    }

    handleSubmit(event) {
        alert('Answer: [2, 4, "hellohello", 18]')
    }

    render() {
        console.log('change question Number');

      return (
          <div>
            <h2>This function counts the length of the parameter that is passed in, but there is an error! Trace the function to answer the questions and then edit the error.</h2>
            <div id="Question1">
                <h3>What will output when we run the code?</h3>
                <p>Use the below text box to help you trace.</p>
                <textarea rows="4" cols="50"></textarea>
            </div>

            <button type="submit" onClick={this.handleSubmit}>Check Your Answer</button>
            <Link to={"/" + this.props.nextQuestion}>
              <button className="nextButton">
                Go to next question
              </button>
            </Link>
          </div>
       )
    }
  }

  export default Problem;