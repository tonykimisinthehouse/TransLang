import createSpeechRecognitionPonyfill from 'web-speech-cognitive-services';
import DictateButton from 'react-dictate-button';
import React from 'react';


// TODO: convert this to directly using microsoft-cognitiveservices-speech-sdk
/*Links:
https://docs.microsoft.com/en-us/javascript/api/overview/azure/speech-service?view=azure-node-latest
https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/samples/js/browser
*/

class Transcript extends React.Component {
    constructor(props) {
        super(props);

        const {
            SpeechRecognition
        } = createSpeechRecognitionPonyfill({
            region: 'eastus',
            subscriptionKey: '48775757e6594c94b69b29bd89de9fd9'
        });

        const recognizer = new SpeechRecognition();
        recognizer.interimResults = true;
        recognizer.lang = 'en-US';
        recognizer.continuous = true;

        this.state = {
            transcripts : [],
            gotFinal: true,
            recognizer: recognizer,
        }
    }

    recognize() {
        console.log("HERE ");
        const transcripts = this.state.transcripts.slice();
        // let gotFinal = this.state.gotFinal;
        // if (gotFinal == false) {
        //     transcripts.pop();
        // }
        // const {
        //     SpeechRecognition
        // } = createSpeechRecognitionPonyfill({
        //     region: 'eastus',
        //     subscriptionKey: '48775757e6594c94b69b29bd89de9fd9'
        // });

        // const recognizer = new SpeechRecognition();
        // recognizer.interimResults = true;
        // recognizer.lang = 'en-US';
        // recognizer.continuous = true;
        const recognizer = this.state.recognizer;

        recognizer.onresult = ({results}) => {
            console.log(results);
            // const result = results[0];
            // console.log(result);
            this.setState({
                transcripts: results,
                // transcripts: transcripts.concat([results[0][0].transcript]),
                // gotFinal: result.isFinal ? true : false,
            })
        };

        // TODO: other call backs such as timedout, failed, started, ended, more here:https://github.com/compulim/web-speech-cognitive-services/blob/HEAD/SPEC-RECOGNITION.md#happy-path

        recognizer.start();
    }

    stop_recognizing() {
        console.log("Stopping");
        this.state.recognizer.stop();
        // FIXME : can't start after stopping once!
    }

    render() {

        const transcripts = this.state.transcripts.slice();
        const wordsOut = transcripts.map((step, move) => {

            return (
                <a key={move}>
                    <b>Haard</b>: {step[0].transcript} <br></br>
                </a>
            );
        });
        // const wordsOut = "Nothing";

        // return <div className="Container">hello</div>;

        return (
            <div className="Transcript">
                <button onClick={() => this.recognize()}>Recognize!</button>
                <button onClick={() => this.stop_recognizing()}>STOP</button>
                <br></br>
                <br></br>
                {wordsOut}
            </div>
        );
    }
}

export default Transcript;
