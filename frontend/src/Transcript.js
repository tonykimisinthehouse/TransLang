import React from 'react';

import { TranslationRecognizer, SpeechTranslationConfig, AudioConfig, ResultReason, } from 'microsoft-cognitiveservices-speech-sdk';

// import Select from 'react-select';

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

        this.languageOptions = {
            english_us : {label: 'English (US)', recogKey: 'en-US', transKey: 'en'},
            english_in: {label: 'English (IN)', recogKey: 'en-IN', transKey: 'en'},
            german: {label: 'Deutsche', recogKey: 'de-DE', transKey: 'de'},
            arabic: {label: 'عربى', recogKey: 'ar-EG', transKey: 'ar'},
            spanish_mx: {label: 'español', recogKey: 'es-MX', transKey: 'es'},
            french_fr: {label: 'français', recogKey: 'fr-FR', transKey: 'fr'},
            hindi: {label: 'हिन्दी', recogKey: 'hi-IN', transKey: 'hi'},
            korean: {label: '한국어', recogKey: 'ko-KR', transKey: 'ko'},
            russian: {label: 'русский', recogKey: 'ru-RU', transKey: 'ru'},
            chinese_simp: {label: '普通话', recogKey: 'zh-CN', transKey: 'zh-Hans'},
        };


        // ANOTHER APPROACH
        // const backgroundlang = 'ar-EG';
        // const recoglang = 'en-US';
        this.defaultRecog = 'es-MX';
        console.log("testing", this.languageOptions["english_us"]);
        this.defaultTranslate = 'en-US';
        const translation_config = SpeechTranslationConfig.fromSubscription(this.subscriptionKey, this.region);
        translation_config.speechRecognitionLanguage = this.defaultRecog;
        translation_config.addTargetLanguage(this.defaultTranslate); 
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        // const audioConfig = AudioConfig.fromWavFileInput("../../backend/TransLang/DemoAudios/good spanish/1-spanish.wav");

        const trecognizer = new TranslationRecognizer(translation_config, audioConfig);
        
        // TODO: add common phrases (for better recog)

        this.state = {
            transcripts: {
                backgroundlang: [],
                recoglang: []
            },
            currentViewingLanguage: this.defaultRecog,
            gotFinal: false,
            trecognizer: trecognizer,
            recognizingCurrently: false,
            buttonLabel: "Recognize",
            backgroundlang: this.defaultTranslate,
            recoglang: this.defaultRecog,
            switched_recoglang: true,
        }
    }

    init_trecognizer(recoglang = this.defaultRecog, backgroundlang = this.defaultTranslate) {
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
        console.log("called recognize");
        const recognizer = this.state.trecognizer;
        recognizer.recognizing = (s, e) => {
            console.log("RECOGNIZING");
            const recognizing = e.result.text;
            // console.log(recognizing);
            // console.log("translations");
            const translations = e.result.privTranslations.privMap;
            // const language = translations.privKeys[0];
            // console.log(language, translation);
            // console.log(e.result.privTranslations.privMap);
            if (recognizing == "") { return; } // don't add empty recognized
            // console.log("RECOGNIZING");
            var origs;
            var backs;
            var recogOrig;
            var recogBack;
            recogOrig = e.result.text;
            recogBack = translations.privValues;
            recogBack = recogBack[recogBack.length - 1];
            if (this.state.switched_recoglang === false) {
                origs = this.state.transcripts.recoglang.slice();
                backs = this.state.transcripts.backgroundlang.slice();
                
            }
            else {
                origs = this.state.transcripts.backgroundlang.slice();
                backs = this.state.transcripts.recoglang.slice();
                // recogOrig = translations.privValues
                // recogOrig = recogOrig[recogOrig.length - 1];
                // recogBack = e.result.text;
            }
            console.log("gets here");
            if (this.state.gotFinal == false) {
                // en_transcripts.pop();
                origs.pop();
                backs.pop();
            }
            // console.log("origs");
            // console.log(origs);
            // console.log("recogorig");
            // console.log(recogOrig);
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
            console.log("RECOGNIZED");
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
            recogOrig = e.result.text;
            recogBack = translations.privValues;
            recogBack = recogBack[recogBack.length - 1];
            if (this.state.switched_recoglang === false) {
                origs = this.state.transcripts.recoglang.slice();
                backs = this.state.transcripts.backgroundlang.slice();
                
            }
            else {
                origs = this.state.transcripts.backgroundlang.slice();
                backs = this.state.transcripts.recoglang.slice();
                // recogOrig = translations.privValues
                // recogOrig = recogOrig[recogOrig.length - 1];
                // recogBack = e.result.text;
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
        // recognizer.recognizeOnceAsync();
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
        const newLang = (this.state.currentViewingLanguage === this.defaultTranslate) ? this.defaultRecog: this.defaultTranslate;
        this.setState({
            currentViewingLanguage: newLang,
        });
    }

    toggle_recoglang() {
        const freezeRecogState = this.state.recognizingCurrently;
        // console.log("Freeze", freezeRecogState);
        if (freezeRecogState) {
            this.toggle_recognizing();
        }
        const defaultorig = this.defaultRecog;
        const defaultback = this.defaultTranslate;
        var switched = false;
        if (this.state.recoglang === defaultorig) {
            this.init_trecognizer(defaultback, defaultorig);
            switched = true;
        } else {
            this.init_trecognizer();
            switched = false; // switched back
        }
        this.setState({
            switched_recoglang: switched,
        });
        // console.log("Freeze", freezeRecogState);
        if (freezeRecogState) {
            this.toggle_recognizing();
        }
    }

    render() {
        const speakingPerson = "> "; // TODO: get this from server 
        var origs;
        var backs;
        const symbol = this.state.currentViewingLanguage;
        const viewinglanguage = (symbol !== this.defaultTranslate) ? "عربى" : "English";

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
        
        const words = (symbol === this.defaultTranslate) ? backs : origs;

        const wordsOut = words.map((step, move) => {
            return (
                <a key={move}>
                    <b>{speakingPerson}</b> {step} <br></br>
                </a>
            );
        });
        // const wordsOut = "Nothing";

        // return <div className="Container">hello</div>;

        // fancy react scroll: https://www.npmjs.com/package/react-scroll (future)

        {/* <Dropdown
            placeholder="Languages"
            fluid
            multiple
            selection
            options={this.languageOptions}
        // onSelectOptions={this.selectedLangs} 
        />

        const options = self.languageOptions.map((step, move) => {
            return (
                <option recogKey
            );
        });

        <Select
            options={this.languageOptions}
            recogKey={this.state.backgroundlang}
            onChange={this.handleLangSelect}
        /> */}


        return (
            <div className="Transcript">
                <div className="transcriptButtonBar">
                    <button onClick={() => this.toggle_recognizing()}>
                        {this.state.buttonLabel}
                    </button>
                    <button onClick={() => this.switch_currentViewingLanguage()}>
                        {viewinglanguage}
                    </button>
                    <button disabled onClick={() => this.toggle_recoglang()}>
                        🎤 in {this.state.recoglang}
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
