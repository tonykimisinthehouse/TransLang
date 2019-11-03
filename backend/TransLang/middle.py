"""
TransLang: Transcribing and Translating module
Uses Azure cognitive services
"""

from config import speech_key, service_region, device_uuid

try:
    import azure.cognitiveservices.speech as speechsdk
except ImportError:
    print("""
    Importing the Speech SDK for Python failed.
    Refer to
    https://docs.microsoft.com/azure/cognitive-services/speech-service/quickstart-python for
    installation instructions.
    """)
    import sys
    sys.exit(1)

class TransLangSpeech(object):
    # def __init__(self, *args, **kwargs):
        # super().__init__(*args, **kwargs)
    """ def __init__(self):

        # config settings
        speech_config = speechsdk.SpeechConfig(
            subscription=speech_key, region=service_region)
        # specify device_uuid in config.py to use specific microphone
        audio_config = speechsdk.AudioConfig(
            device_name=device_uuid) if device_uuid else None
        # TODO: change following audio config (currently just uses weatherfile)
        weatherfilename = "whatstheweatherlike.wav"
        # audio_config = speechsdk.audio.AudioConfig(filename=weatherfilename)

        # initialize recognizer
        self.speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

        self.speech_recognizer.recognizing.connect(self.recognizing)
        self.speech_recognizer.recognized.connect(self.recognized)

        self.speech_recognizer.recognize_once()
        # self.speech_recognizer.start_continuous_recognition()

        self.counter = 1 """
    
    def __init__(self, source_lang='', target_langs=[]):

        # config settings
        self.source_lang = 'en-US'
        self.target_langs = ['es', 'zh-Hans']
        translation_config = speechsdk.translation.SpeechTranslationConfig(
            subscription=speech_key, region=service_region,
            speech_recognition_language='en-US',
            target_languages=tuple(self.target_langs))
        # specify device_uuid in config.py to use specific microphone
        # audio_config = speechsdk.AudioConfig(device_name=device_uuid) if device_uuid else None
        # TODO: change following audio config (currently just uses weatherfile)
        self.weatherfilename = "whatstheweatherlike.wav"
        # audio_config = speechsdk.audio.AudioConfig(filename=self.weatherfilename)
        # from default microphone
        audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)

        # initialize translation recognizer
        self.speech_recognizer = speechsdk.translation.TranslationRecognizer(translation_config=translation_config, audio_config=audio_config)

        # connect callback function for continuous recognition or other reasons
        # self.speech_recognizer.recognizing.connect(self.recognizing)
        # self.speech_recognizer.recognized.connect(self.recognized)

        # self.speech_recognizer.recognize_once()
        # self.speech_recognizer.start_continuous_recognition()

        self.counter = 1
    
    def recognizeContinuous(self, fileName=None):
        self.speech_recognizer.recognizing.connect(self.recognizing)
        self.speech_recognizer.recognized.connect(self.recognized)

        self.speech_recognizer.start_continuous_recognition()

    def recognizeOnce(self, fileName=None):
        # TODO: config new self.speech_recognizer with new fileName
        fileName = self.weatherfilename if not fileName else fileName
        result = self.speech_recognizer.recognize_once()
        if result.reason == speechsdk.ResultReason.TranslatedSpeech:
            print("""Recognized: {}
    Spanish translation: {}
    Chinese translation: {}""".format(
                result.text, result.translations['es'], result.translations['zh-Hans']))
        elif result.reason == speechsdk.ResultReason.RecognizedSpeech:
            print("Recognized: {}".format(result.text))
        elif result.reason == speechsdk.ResultReason.NoMatch:
            print("No speech could be recognized: {}".format(result.no_match_details))
        elif result.reason == speechsdk.ResultReason.Canceled:
            print("Translation canceled: {}".format(result.cancellation_details.reason))
            if result.cancellation_details.reason == speechsdk.CancellationReason.Error:
                print("Error details: {}".format(result.cancellation_details.error_details))

    def recognizing(self, args):
        """Callback event while recognizing is in progress. Its recognizING"""
        # print("recognizing")
        print(args.result.text)

    def recognized(self, args):
        """Callback event recognizing is done. Its recognizED"""
        # print("args",args)
        # print("Recognized: {}".format(args.result.text))
        # Check the result
        if args.result.reason == speechsdk.ResultReason.TranslatedSpeech:
            print("""Recognized: {}
    German translation: {}
    French translation: {}""".format(
                args.result.text, args.result.translations['es'], args.result.translations['zh-Hans']))
        elif args.result.reason == speechsdk.ResultReason.RecognizedSpeech:
            print("Recognized: {}".format(args.result.text))
        elif args.result.reason == speechsdk.ResultReason.NoMatch:
            print("No speech could be recognized: {}".format(args.result.no_match_details))
        elif args.result.reason == speechsdk.ResultReason.Canceled:
            print("Translation canceled: {}".format(args.result.cancellation_details.reason))
            if args.result.cancellation_details.reason == speechsdk.CancellationReason.Error:
                print("Error details: {}".format(args.result.cancellation_details.error_details))
        
        self.counter += 1

if __name__ == "__main__":
    translang = TransLangSpeech(source_lang='en-US')
    # translang.recognizeOnce()
    translang.recognizeContinuous()

