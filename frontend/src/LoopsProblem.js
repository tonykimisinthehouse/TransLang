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
        alert('Answer: i = 0 aString = “goFalcons” while i < len(aString): print(aString[i]) i = i + 1')
    }

    render() {

      return (
          <div>
            <h2>Loops!</h2>
            <div id="Question1">
                <h3>Convert this for loop into a while loop.</h3>
                <p>Use the below text box to help you trace.</p>
                <textarea rows="4" cols="50"></textarea>
            </div>
            <button type="submit" onClick={this.handleSubmit}>Check Your Answer</button>
          </div>
       )
    }
  }

  export default Problem;