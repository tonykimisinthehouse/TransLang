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
        alert('Answer: line 3 should be "return 0"')
    }
    render() {
        console.log('change question Number');
        var MC1A = 6;
        var MC1B = 7;
        var MC1C = 8;
        var MC1D = 1301;
        var correctChoice1 = "C";
        var answer1 = 8;

        var MC2A = 2;
        var MC2B = 3;
        var MC2C = 4;
        var MC2D = 5;
        var correctChoice2 = "B";
        var answer2 = 3;

        if (this.props.problemNumber === 2) {
          MC1A = 5;
          MC1B = 1;
          MC1C = 3;
          MC1D = 6;
          correctChoice1 = "C";
          answer1 = 3;

          MC2A = 2;
          MC2B = 3;
          MC2C = 4;
          MC2D = 5;
          correctChoice2 = "D";
          answer2 = 5;
        }

      return (
          <div>
            <h2>This function counts the length of the parameter that is passed in, but there is an error! Trace the function to answer the questions and then edit the error.</h2>
            <div id="Question1">
                <h3>What will output when we run the code as it is currently?</h3>
                <MultipleChoice answer={answer1} correctChoice={correctChoice1} choiceA={MC1A} choiceB={MC1B} choiceC={MC1C} choiceD={MC1D} id={"answerChoice1"}/>
            </div>

            <div id="Question2">
                <h3>Identify which line has the error.</h3>
                <MultipleChoice answer={answer2} correctChoice={correctChoice2} choiceA={MC2A} choiceB={MC2B} choiceC={MC2C} choiceD={MC2D} id={"answerChoice2"}/>
            </div>
            <h3>Now work with your partner to fix the error!</h3>

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