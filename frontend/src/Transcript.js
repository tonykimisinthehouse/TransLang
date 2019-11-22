import React from 'react';

import { TranslationRecognizer, SpeechTranslationConfig, AudioConfig, ResultReason, } from 'microsoft-cognitiveservices-speech-sdk';

import Select from 'react-select';

function LangButton(props) {
    // needs arguments onClick (callback func) and lang (string)
    return (
        <button classlabel="" onClick={props.onClick}>
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
            {label: 'English (US)', recogKey: 'en-US', transKey: 'en'},
            {label: 'English (IN)', recogKey: 'en-IN', transKey: 'en'},
            {label: 'Deutsche', recogKey: 'de-DE', transKey: 'de'},
            {label: 'عربى', recogKey: 'ar-EG', transKey: 'ar'},
            {label: 'español', recogKey: 'es-MX', transKey: 'es'},
            {label: 'français', recogKey: 'fr-FR', transKey: 'fr'},
            {label: 'हिन्दी', recogKey: 'hi-IN', transKey: 'hi'},
            {label: '한국어', recogKey: 'ko-KR', transKey: 'ko'},
            {label: 'русский', recogKey: 'ru-RU', transKey: 'ru'},
            {label: '普通话', recogKey: 'zh-CN', transKey: 'zh-Hans'},
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
            selectedSecondaryLanguage: null
        }

    }

    translate_recognize() {
        const recognizer = this.state.trecognizer;
        recognizer.recognizing = (s, e) => {
            const recognizing = e.result.label;
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
            const recognized = e.result.label;
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


    handleLangSelect = selectedSecondaryLanguage => {
        this.setState({ selectedSecondaryLanguage });
        console.log("Option Selected:", selectedSecondaryLanguage);
    }

    selectedLang(secondaryLang)  {
        console.log(secondaryLang);
        this.setState({
            selectedSecondaryLanguage: secondaryLang,
        });
    }

    render() {

        const transcripts = this.state.en_transcripts.slice();
        console.log("transcripts");
        console.log(transcripts);
        const wordsOut = transcripts.map((step, move) => {
            return (
                <a transKey={move}>
                    <b>Haard</b>: {step} <br></br>
                </a>
            );
        });
        // const wordsOut = "Nothing";

        // return <div classlabel="Container">hello</div>;

        // fancy react scroll: https://www.npmjs.com/package/react-scroll (future)

        // <Dropdown
        //     placeholder="Languages"
        //     fluid
        //     multiple
        //     selection
        //     options={this.languageOptions}
        // // onSelectOptions={this.selectedLangs} 
        // />

        // const options = self.languageOptions.map((step, move) => {
        //     return (
        //         <option recogKey
        //     );
        // });

        return (
            <div classlabel="Transcript">
                <div classlabel="transcriptRow">
                    <button onClick={() => this.toggle_recognizing()}>
                        {this.state.buttonLabel}
                    </button>
                    <Select
                        options={this.languageOptions}
                        recogKey={this.state.selectedSecondaryLanguage}
                        onChange={this.handleLangSelect}
                    />
                </div>
                <div classlabel="scrollableDialogues" style={{overflowY: 'auto'}}>
                    {wordsOut}
                </div>
            </div>
        );
    }
}

export default Transcript;
