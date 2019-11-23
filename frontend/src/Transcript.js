import React from 'react';

import { TranslationRecognizer, SpeechTranslationConfig, AudioConfig, TranslationRecognitionEventArgs} from 'microsoft-cognitiveservices-speech-sdk';

// import Select from 'react-select';

import Emoji from "a11y-react-emoji";

// function LangButton(props) {
//     // needs arguments onClick (callback func) and lang (string)
//     return (
//         <button className="" onClick={props.onClick}>
//             {props.lang}
//         </button>
//     );
// }

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

        this.defaultRecog = this.languageOptions.english_us;
        console.log("testing", this.languageOptions["english_us"]); // WORKS!
        // this.defaultTranslate = this.languageOptions.spanish_mx;
        this.defaultTranslate = this.languageOptions.korean;
        const translation_config = SpeechTranslationConfig.fromSubscription(this.subscriptionKey, this.region);
        translation_config.speechRecognitionLanguage = this.defaultRecog.recogKey;
        translation_config.addTargetLanguage(this.defaultTranslate.recogKey); 
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        // const audioConfig = AudioConfig.fromWavFileInput("../../backend/TransLang/DemoAudios/good spanish/1-spanish.wav");

        const trecognizer = new TranslationRecognizer(translation_config, audioConfig);
        
        // TODO: add common phrases (for better recog)

        this.state = {
            transcripts: [
                {language: this.defaultRecog, scripts: []},
                {language: this.defaultTranslate, scripts: []},
            ],
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
        translation_config.speechRecognitionLanguage = recoglang.recogKey;
        translation_config.addTargetLanguage(backgroundlang.recogKey)
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        const trecognizer = new TranslationRecognizer(translation_config, audioConfig);
        this.setState({
            recoglang: recoglang,
            backgroundlang: backgroundlang,
            trecognizer: trecognizer,
            switched_recoglang: !this.state.switched_recoglang,
        });
    }

    /**
     * 
     * @param {TranslationRecognitionEventArgs} e
     * @param {Boolean}  popLast
     */
    updateTranscripts(e, popLast) {
        console.log("test call");
        const recogText = e.result.text;
        var i; 
        var transcripts = this.state.transcripts.slice();
        for (i = 0; i < transcripts.length; i++) {
            if (popLast) {
                transcripts[i].scripts.pop();
            }
            if (transcripts[i].language.label === this.state.recoglang.label) {
                transcripts[i].scripts.push(recogText);
            }
            else { // get translated version and pust
                const currTransKey = transcripts[i].language.transKey;
                const transText = e.result.translations.get(currTransKey);
                transcripts[i].scripts.push(transText);
            }
        }
        return transcripts;
    }

    translate_recognize() {
        console.log("called recognize");
        const recognizer = this.state.trecognizer;
        recognizer.recognizing = (s, e) => {
            console.log("RECOGNIZING");
            const popLast = (this.state.gotFinal === false) ? true : false;
            const newTranscripts = this.updateTranscripts(e, popLast);

            this.setState({
                transcripts: newTranscripts,
                gotFinal : false,
            });
        }; 
        // recognizer.recognized = this.recognized_callback;
        recognizer.recognized = (s, e) => {
            console.log("RECOGNIZED");
            const popLast = (this.state.gotFinal === false) ? true : false;
            const newTranscripts = this.updateTranscripts(e, popLast);

            this.setState({
                transcripts : newTranscripts,
                gotFinal : true,
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

    switch_currentViewingLanguage() { // TODO: only works with two languages. with multiple there should be buttons 
        const newLang = (this.state.currentViewingLanguage === this.state.recoglang) ? this.state.backgroundlang: this.state.recoglang;
        this.setState({
            currentViewingLanguage: newLang,
        });
    }

    /**
     * WARNING: switching while recognizing doesn't work yet (couldn't stop and start automatically)
     *      so for now just stops and switches listening lang but thats it
     */
    toggle_recoglang() {
        const freezeRecogState = this.state.recognizingCurrently;
        // console.log("Freeze", freezeRecogState);
        if (freezeRecogState) { // DOESN'T WORK AS INTENDED 
            this.toggle_recognizing();
        }
        const defaultorig = this.defaultRecog;
        const defaultback = this.defaultTranslate;
        var switched = false;
        const newRecog = this.state.backgroundlang;
        const newBack = this.state.recoglang;
        this.init_trecognizer(newRecog, newBack);

        // console.log("Freeze", freezeRecogState);
        if (freezeRecogState) { // DOESN'T WORK - doesn't toggle on recording
            this.toggle_recognizing();
        }
    }

    /**
     * 
     * @param {} lang ex: {label: 'English (US)', recogKey: 'en-US', transKey: 'en'}
     */
    get_specified_scripts(lang) {
        const transcripts = this.state.transcripts;
        var i;
        for (i = 0; i < transcripts.length; i++) {
            if (transcripts[i].language.label === lang.label) {
                const found = transcripts[i].scripts.slice();
                return found;
            }
        }
        return null;
    }

    render() {
        const speakingPerson = "> "; // TODO: get this from server 
        const symbol = this.state.currentViewingLanguage;
        const viewinglanguage = (symbol === this.state.backgroundlang) ? this.state.recoglang.label : this.state.backgroundlang.label;

        console.log("----------------transcripts----------------");
        console.log(this.state.transcripts);

        const words = this.get_specified_scripts(symbol);
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
                    <button onClick={() => this.toggle_recoglang()}>
                        <Emoji symbol="🎤" /> in {this.state.recoglang.label}
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
