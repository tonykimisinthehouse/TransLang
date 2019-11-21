import createSpeechRecognitionPonyfill from 'web-speech-cognitive-services';
import DictateButton from 'react-dictate-button';
import React from 'react';

import { TranslationRecognizer, SpeechTranslationConfig, AudioConfig, ResultReason, } from 'microsoft-cognitiveservices-speech-sdk';

// TODO: convert this to directly using microsoft-cognitiveservices-speech-sdk
/*Links:
https://docs.microsoft.com/en-us/javascript/api/overview/azure/speech-service?view=azure-node-latest
https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/samples/js/browser
*/

function LangButton(props) {
    // needs arguments onClick (callback func) and lang (string)
    return (
        <button className="" onClick={props.onClick}>
            {props.lang}
        </button>
    );
}

class Transcript extends React.Component {
    constructor(props) {
        super(props);

        const region = 'eastus';
        const subscriptionKey = '48775757e6594c94b69b29bd89de9fd9';
        const language = 'en-US'; // TODO: accept this from props
        // const target_languages // TODO: accept from props and add one by one

        /*
        Languages:
        en-US (english) | en 
        ar-EG (Arabic)  | ar
        es-MX (Spanish) | es

        Scenario:
        Speaker 1: Arabic and english
        Speaker 2: Spanish and english

        Other languages:
        fr-FR (French)  | fr
        zh-CN (Chinese) | zh-Hans
        */

        /* const {
            SpeechRecognition
        } = createSpeechRecognitionPonyfill({
            region: region,
            subscriptionKey: subscriptionKey
        });

        const recognizer = new SpeechRecognition();
        recognizer.interimResults = true;
        recognizer.lang = language;
        recognizer.continuous = true; */

        // ANOTHER APPROACH
        const translation_config = SpeechTranslationConfig.fromSubscription(subscriptionKey, region);
        translation_config.speechRecognitionLanguage = language;
        translation_config.addTargetLanguage("de"); 
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

        const trecognizer = new TranslationRecognizer(translation_config, audioConfig);
        // TODO: add common phrases (for better recog)

        

        this.state = {
            en_transcripts : [],
            transcripts : [],
            gotFinal: false,
            trecognizer: trecognizer,
            recognizingCurrently: false,
            buttonLabel: "Recognize",
        }

    }

    recognizing_callback(s, e) {
        // console.log("(recognizing) " + e.result.text);
        // console.log(e.result.translations.get("de"));
        // const transcripts = this.state.en_transcripts.slice();
        // if (!this.state.gotFinal) {
        //     transcripts.pop();
        // }

        // just english temporarily (which is current listening lang)
        // this.setState({
        //     en_transcripts: transcripts.concat([e.result.text]),
        //     gotFinal: false,
        // }); 
    }

    addResultToTranscript(resultStr) {
        console.log("adding result to global. result:");
        console.log(resultStr);

        console.log("curr Transcript");
        console.log(this.state.en_transcripts);
        this.state.en_transcripts.push(resultStr);
        console.log(this.state.en_transcripts);
    }

    recognized_callback(s, e) {
        
        // var str = "\r\n(recognized) Reason: " + ResultReason[e.result.reason] + " Text: " + e.result.text + " Translations:";
        // var language = "de";
        // str += " [" + language + "] " + e.result.translations.get(language);
        // str += "\r\n";
        // console.log(str);

        if (e.result.text == ""){
            return;
        }
        const recognized = e.result.text;
        this.addResultToTranscript(recognized);
        // console.log("recognized as lst");
        // console.log([recognized]);
        // console.log(recognized);
        // const transcripts = this.state.en_transcripts;
        // this.state.en_transcripts.push(recognized);
        // console.log("gets here");
        // console.log("preintermediate transcript");
        // console.log(transcripts);
        // transcripts.append(recognized);
        // console.log("intermediate transcripts");
        // console.log(transcripts);
        // if (!this.state.gotFinal){
        //     transcripts.pop();
        // }

        // this.setState({
            // en_transcripts: transcripts,
            // gotFinal: true,
        // });
    }

    translate_recognize() {
        const recognizer = this.state.trecognizer;
        recognizer.recognizing = this.recognizing_callback;
        // recognizer.recognized = this.recognized_callback;
        recognizer.recognized = (s, e) => {
            console.log("inside inline callback function");
            console.log("prev transcripts");
            console.log(this.state.en_transcripts);
            console.log("e.result.text")
            console.log(e.result.text); // is string
            const recognized = e.result.text;
            if (recognized == ""){
                return;
            }
            const en_transcripts = this.state.en_transcripts.slice();
            this.setState({
                en_transcripts: en_transcripts.concat([recognized]),
            });
            console.log("got here");
        }
        recognizer.startContinuousRecognitionAsync();
    }

    stop_translating() {
        const recognizer = this.state.trecognizer;
        recognizer.stopContinuousRecognitionAsync();
    }

    toggle_recognizing() {
        const startLabel = "Recognize";
        const stopLabel = "Stop";


        if (this.state.recognizingCurrently) { // already recognizing
            this.stop_translating();
            this.setState({
                recognizingCurrently: false,
                buttonLabel: startLabel,
            });
        } else {                                // not recognizing
            this.translate_recognize();
            this.setState({
                recognizingCurrently: true,
                buttonLabel: stopLabel,
            });
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

        const transcripts = this.state.en_transcripts.slice();
        console.log("transcripts");
        console.log(transcripts);
        const wordsOut = transcripts.map((step, move) => {
            return (
                <a key={move}>
                    <b>Haard</b>: {step} <br></br>
                </a>
            );
        });
        // const wordsOut = "Nothing";

        // return <div className="Container">hello</div>;

        return (
            <div className="Transcript">
                <button onClick={() => this.toggle_recognizing()}>{this.state.buttonLabel}</button>
                <br></br>
                <br></br>
                {wordsOut}
            </div>
        );
    }
}

export default Transcript;
