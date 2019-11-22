import React from 'react';

import { TranslationRecognizer, SpeechTranslationConfig, AudioConfig, ResultReason, } from 'microsoft-cognitiveservices-speech-sdk';

import { Dropdown } from 'semantic-ui-react';
// TODO: convert this to directly using microsoft-cognitiveservices-speech-sdk
/*Links:
https://docs.microsoft.com/en-us/javascript/api/overview/azure/speech-service?view=azure-node-latest
https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/samples/js/browser
*/

function LangButton(props) {
    // needs arguments onClick (callback func) and lang (string)
    return (
        <button classtext="" onClick={props.onClick}>
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

        this.languageOptions = [
            {text: 'English (US)', value: 'en-US', key: 'en-US'},
            {text: 'English (IN)', value: 'en-IN', key: 'en-IN'},
            {text: 'Deutsche', value: 'de-DE', key: 'de-DE'},
            {text: 'عربى', value: 'ar-EG', key: 'ar-EG'},
            {text: 'español', value: 'es-MX', key: 'es-MX'},
            {text: 'français', value: 'fr-FR', key: 'fr-FR'},
            {text: 'हिन्दी', value: 'hi-IN', key: 'hi-IN'},
            {text: '한국어', value: 'ko-KR', key: 'ko-KR'},
            {text: 'русский', value: 'ru-RU', key: 'ru-RU'},
            {text: '普通话', value: 'zh-CN', key: 'zh-CH'},
        ];

        // ANOTHER APPROACH
        const translation_config = SpeechTranslationConfig.fromSubscription(subscriptionKey, region);
        translation_config.speechRecognitionLanguage = language;
        translation_config.addTargetLanguage("de"); 
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

        const trecognizer = new TranslationRecognizer(translation_config, audioConfig);
        
        // TODO: add common phrases (for better recog)

        this.state = {
            en_transcripts: [],
            transcripts : [],
            gotFinal: false,
            trecognizer: trecognizer,
            recognizingCurrently: false,
            buttonLabel: "Recognize",
            selectedLanguages: [],
            
        }

    }

    translate_recognize() {
        const recognizer = this.state.trecognizer;
        recognizer.recognizing = (s, e) => {
            const recognizing = e.result.text;
            if (recognizing == "") { return; } // don't add empty recognized
            // console.log("RECOGNIZING");
            const en_transcripts = this.state.en_transcripts.slice();
            if (this.state.gotFinal == false) en_transcripts.pop();
            this.setState({
                en_transcripts: en_transcripts.concat([recognizing]),
                gotFinal: false,
            });

        }; 
        // recognizer.recognized = this.recognized_callback;
        recognizer.recognized = (s, e) => {
            const recognized = e.result.text;
            if (recognized == ""){ return; } // don't add empty recognized 
            // console.log("RECOGNIZED");
            const en_transcripts = this.state.en_transcripts.slice();

            if (this.state.gotFinal == false) en_transcripts.pop();
            this.setState({
                en_transcripts: en_transcripts.concat([recognized]),
                gotFinal: true,
            });

            // TODO: async call function to send transcripts to server
        };
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

    selectedLangs(langlst)  {
        console.log(langlst);
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

        // return <div classtext="Container">hello</div>;

        // fancy react scroll: https://www.npmjs.com/package/react-scroll (future)

        return (
            <div classtext="Transcript">
                <div classtext="transcriptRow">
                    <button onClick={() => this.toggle_recognizing()}>
                        {this.state.buttonLabel}
                    </button>
                    
                </div>
                
                <Dropdown
                    placeholder="Languages"
                    fluid
                    multiple
                    selection
                    options={this.languageOptions}
                // onSelectOptions={this.selectedLangs} 
                />

                <br></br>
                <br></br>
                <div classtext="scrollableDialogues" style={{overflowY: 'auto'}}>
                    {wordsOut}
                </div>
            </div>
        );
    }
}

export default Transcript;
