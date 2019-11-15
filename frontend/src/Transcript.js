import createSpeechRecognitionPonyfill from 'web-speech-cognitive-services';
import DictateButton from 'react-dictate-button';
import React from 'react';


class Transcript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transcripts : [
                'Transcripts'  
            ],
            gotFinal: true,
        }
    }

    recognize() {
        console.log("HERE ");
        const transcripts = this.state.transcripts.slice();
        let gotFinal = this.state.gotFinal;
        if (gotFinal == false) {
            transcripts.pop();
        } 
        const {
            SpeechRecognition
        } = createSpeechRecognitionPonyfill({
            region: 'eastus',
            subscriptionKey: '48775757e6594c94b69b29bd89de9fd9'
        });

        const recognizer = new SpeechRecognition();
        recognizer.interimResults = true;
        recognizer.lang = 'en-US'

        recognizer.onresult = ({ results }) => {
            console.log(results[0]);
            const result = results[0];
            this.setState({
                transcripts: transcripts.concat([results[0][0].transcript]),
                gotFinal: result.isFinal ? true : false,
            })
        };

        recognizer.start();
    }

    render() {

        const transcripts = this.state.transcripts.slice();
        const wordsOut = transcripts.map((step, move) => {

            return (
                <a key={move}>
                    <b>Haard</b>: {step} <br></br>
                </a>
            );
        });

        // return <div className="Container">hello</div>;
        return (
            <div className="Transcript">

                <button onClick={() => this.recognize()}>Recognize!</button>
                <br></br>
                <br></br>
                {wordsOut}
            </div>
        );
    }
}

export default Transcript;
