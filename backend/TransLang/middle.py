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
    def __init__(self, *args, **kwargs):
        # super().__init__(*args, **kwargs)
        
        # config settings
        speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
        # specify device_uuid in config.py to use specific microphone
        audio_config = speechsdk.AudioConfig(device_name=device_uuid) if device_uuid else None
        # TODO: change following audio config (currently just uses weatherfile)
        weatherfilename = "whatstheweatherlike.wav"
        # audio_config = speechsdk.audio.AudioConfig(filename=weatherfilename)

        # initialize recognizer
        self.speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

        self.speech_recognizer.recognizing.connect(self.recognizing)
        self.speech_recognizer.recognized.connect(self.recognized)
        
        # self.speech_recognizer.recognize_once()
        self.speech_recognizer.start_continuous_recognition()

        self.counter = 1

    def recognizing(self, args):
        """Callback event while recognizing is in progress. Its recognizING"""
        # print("recognizing")
        print(args.result.text)

    def recognized(self, args):
        """Callback event recognizing is done. Its recognizED"""
        result = args.result
        print("Recognized: {}".format(result.text))
        # Check the result
        if result.reason == speechsdk.ResultReason.RecognizedSpeech:
            print("Recognized: {}: {}".format(self.counter, result.text))
        elif result.reason == speechsdk.ResultReason.NoMatch:
            print("No speech could be recognized")
        elif result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = result.cancellation_details
            print("Speech Recognition canceled: {}".format(cancellation_details.reason))
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                print("Error details: {}".format(cancellation_details.error_details))
        
        self.counter += 1

if __name__ == "__main__":
    _ = TransLangSpeech()

