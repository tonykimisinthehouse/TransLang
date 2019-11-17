import React from 'react';
import MultipleChoice from './MultipleChoice';

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

      return (
          <div>
            <div id="Question1">
                <p>This function has an error. The goal is meant to count the length of the parameter that is passed in.</p>
                <p>What will output when we run the code as it is currently?</p>
                <MultipleChoice answer={answer1} correctChoice={correctChoice1} choiceA={MC1A} choiceB={MC1B} choiceC={MC1C} choiceD={MC1D}/>
            </div>

            <div id="Question2">
                <p>Identify which line has the error.</p>
                <MultipleChoice answer={answer2} correctChoice={correctChoice2} choiceA={MC2A} choiceB={MC2B} choiceC={MC2C} choiceD={MC2D}/>
            </div>
            <p>Now work with your partner to fix the error!</p>
            <button>Edit code!</button>

            <button type="submit" onClick={this.handleSubmit}>Get Answer</button>
          </div>
       )
    }
  }

  export default Problem;