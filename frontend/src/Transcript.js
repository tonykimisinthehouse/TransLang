import React from 'react';

import { TranslationRecognizer, SpeechTranslationConfig, AudioConfig, ResultReason, } from 'microsoft-cognitiveservices-speech-sdk';

import Select from 'react-select';

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

        this.region = 'eastus';
        this.subscriptionKey = '48775757e6594c94b69b29bd89de9fd9';

        // this.languageOptions = [
        //     {label: 'English (US)', recogKey: 'en-US', transKey: 'en'},
        //     {label: 'English (IN)', recogKey: 'en-IN', transKey: 'en'},
        //     {label: 'Deutsche', recogKey: 'de-DE', transKey: 'de'},
        //     {label: 'عربى', recogKey: 'ar-EG', transKey: 'ar'},
        //     {label: 'español', recogKey: 'es-MX', transKey: 'es'},
        //     {label: 'français', recogKey: 'fr-FR', transKey: 'fr'},
        //     {label: 'हिन्दी', recogKey: 'hi-IN', transKey: 'hi'},
        //     {label: '한국어', recogKey: 'ko-KR', transKey: 'ko'},
        //     {label: 'русский', recogKey: 'ru-RU', transKey: 'ru'},
        //     {label: '普通话', recogKey: 'zh-CN', transKey: 'zh-Hans'},
        // ];

        // ANOTHER APPROACH
        const backgroundlang = 'ar-EG';
        const recoglang = 'en-US';
        const translation_config = SpeechTranslationConfig.fromSubscription(this.subscriptionKey, this.region);
        translation_config.speechRecognitionLanguage = recoglang;
        translation_config.addTargetLanguage(backgroundlang);  // for now Arabic
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

        const trecognizer = new TranslationRecognizer(translation_config, audioConfig);
        
        // TODO: add common phrases (for better recog)

        // {
        //     backgroundLang: String
        //     transcript: []
        // }
        this.state = {
            transcripts: {
                backgroundlang: [],
                recoglang: []
            },
            currentViewingLanguage: recoglang,
            gotFinal: false,
            trecognizer: trecognizer,
            recognizingCurrently: false,
            buttonLabel: "Recognize",
            backgroundlang: backgroundlang,
            recoglang: recoglang,
            switched_recoglang: false,
        }
    }
    
    init_trecognizer(recoglang = "en-US", backgroundlang="ar-EG") {
        const translation_config = SpeechTranslationConfig.fromSubscription(this.subscriptionKey, this.region);
        translation_config.speechRecognitionLanguage = recoglang;
        translation_config.addTargetLanguage(backgroundlang)
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        const trecognizer = new TranslationRecognizer(translation_config, audioConfig);
        this.setState({
            backgroundlang: backgroundlang,
            recoglang: recoglang,
            trecognizer: trecognizer,
        });
    }

    translate_recognize() {
        const recognizer = this.state.trecognizer;
        recognizer.recognizing = (s, e) => {
            console.log("RECOGNIZING");
            const recognizing = e.result.text;
            // console.log(recognizing);
            // console.log("translations");
            const translations = e.result.privTranslations.privMap;
            // const language = translations.privKeys[0];
            const translation = translations.privValues[0];
            // console.log(language, translation);
            // console.log(e.result.privTranslations.privMap);
            if (recognizing == "") { return; } // don't add empty recognized
            // console.log("RECOGNIZING");
            var origs;
            var backs;
            var recogOrig;
            var recogBack;
            if (this.state.switched_recoglang === false) {
                origs = this.state.transcripts.recoglang.slice();
                backs = this.state.transcripts.backgroundlang.slice();
                recogOrig = e.result.text;
                recogBack = translations.privValues;
                recogBack = recogBack[recogBack.length - 1];
            }
            else {
                origs = this.state.transcripts.backgroundlang.slice();
                backs = this.state.transcripts.recoglang.slice();
                recogOrig = translations.privValues
                recogOrig = recogOrig[recogOrig.length - 1];
                recogBack = e.result.text;
            }
            console.log("gets here");
            if (this.state.gotFinal == false) {
                // en_transcripts.pop();
                origs.pop();
                backs.pop();
            }
            console.log("origs");
            console.log(origs);
            console.log("recogorig");
            console.log(recogOrig);
            this.setState({
                transcripts: {
                    backgroundlang: backs.concat([recogBack]),
                    recoglang: origs.concat([recogOrig]),
                },
                gotFinal: false,
            });
        }; 
        // recognizer.recognized = this.recognized_callback;
        recognizer.recognized = (s, e) => {
            // console.log("RECOGNIZED");
            const recognized = e.result.text;
            // console.log(recognized);
            // console.log("translations");
            const translations = e.result.privTranslations.privMap;
            var language = translations.privKeys;
            language = language[language.length - 1];
            var translation = translations.privValues;
            translation = translation[translation.length - 1];
            // console.log(language, translation);
            if (recognized == ""){ return; } // don't add empty recognized 
            var origs;
            var backs;
            var recogOrig;
            var recogBack;
            if (this.state.switched_recoglang === false) {
                origs = this.state.transcripts.recoglang.slice();
                backs = this.state.transcripts.backgroundlang.slice();
                recogOrig = e.result.text;
                recogBack = translations.privValues;
                recogBack = recogBack[recogBack.length - 1];
            }
            else {
                origs = this.state.transcripts.backgroundlang.slice();
                backs = this.state.transcripts.recoglang.slice();
                recogOrig = translations.privValues
                recogOrig = recogOrig[recogOrig.length - 1];
                recogBack = e.result.text;
            }
            if (this.state.gotFinal == false) {
                // en_transcripts.pop();
                origs.pop();
                backs.pop();
            }
            this.setState({
                transcripts: {
                    backgroundlang: backs.concat([recogBack]),
                    recoglang: origs.concat([recogOrig]),
                },
                gotFinal: true,
            });

            // TODO: async call function to send transcripts to server
        };
        recognizer.startContinuousRecognitionAsync();
    }

    stop_translating() {
        const recognizer = this.state.trecognizer;
        recognizer.stopContinuousRecognitionAsync();
        this.setState({
            gotFinal: true,
        })
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


    handleLangSelect = backgroundlang => {
        this.setState({ backgroundlang });
        console.log("Option Selected:", backgroundlang);
    }

    selectedLang(secondaryLang)  {
        console.log(secondaryLang);
        this.setState({
            backgroundlang: secondaryLang,
        });
    }

    switch_currentViewingLanguage() {
        const backlang = "ar-EG";
        const origlang = "en-US";
        const newLang = (this.state.currentViewingLanguage === backlang) ? origlang: backlang;
        this.setState({
            currentViewingLanguage: newLang,
        });
    }

    render() {
        const speakingPerson = "Haard"; // TODO: get this from server 
        var origs;
        var backs;
        const symbol = this.state.currentViewingLanguage;
        const viewinglanguage = (symbol === "ar-EG") ? "عربى" : "English";

        if (this.state.switched_recoglang === false) {
            origs = this.state.transcripts.recoglang.slice();
            // console.log("origs");
            // console.log(origs);
            backs = this.state.transcripts.backgroundlang.slice();
        }
        else {
            origs = this.state.transcripts.backgroundlang.slice();
            backs = this.state.transcripts.recoglang.slice();
        }
        // console.log("transcripts");
        // console.log(origs);
        
        const words = (symbol === "ar-EG") ? backs : origs;

        const wordsOut = words.map((step, move) => {
            return (
                <a key={move}>
                    <b>{speakingPerson}</b>: {step} <br></br>
                </a>
            );
        });
        // const wordsOut = "Nothing";

        // return <div className="Container">hello</div>;

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

        // <Select
        //     options={this.languageOptions}
        //     recogKey={this.state.backgroundlang}
        //     onChange={this.handleLangSelect}
        // />


        return (
            <div className="Transcript">
                <div className="transcriptButtonBar">
                    <button onClick={() => this.toggle_recognizing()}>
                        {this.state.buttonLabel}
                    </button>
                    <button onClick={() => this.switch_currentViewingLanguage()}>
                        {viewinglanguage}
                    </button>
                </div>
                <br></br>

                <div className="scrollableDialogues" style={{overflowY: 'auto'}}>
                    {wordsOut}
                </div>
            </div>
        );
    }
}

export default Transcript;
