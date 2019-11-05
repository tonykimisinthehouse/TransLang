"""tmp translating code for demo"""

from config import speech_key, service_region, device_uuid
import time

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



# config settings
source_lang = 'es-MX'
target_langs = ['en', 'ko']
translation_config = speechsdk.translation.SpeechTranslationConfig(
    subscription=speech_key, region=service_region,
    speech_recognition_language=source_lang,
    target_languages=tuple(target_langs))
# specify device_uuid in config.py to use specific microphone
# audio_config = speechsdk.AudioConfig(device_name=device_uuid) if device_uuid else None
audioFile = "whatstheweatherlike.wav"
audioFile = "DemoAudios/1-spanish.m4a"
# audio_config = speechsdk.audio.AudioConfig(filename=audioFile)
# from default microphone
audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)

# initialize translation recognizer
speech_recognizer = speechsdk.translation.TranslationRecognizer(translation_config=translation_config, audio_config=audio_config)

def recognizing( args):
    """Callback event while recognizing is in progress. Its recognizING"""
    # print("recognizing")
    # print(args.result.text)

def recognized( args):
    """Callback event recognizing is done. Its recognizED"""
    # print("args",args)
    # print("recognized")
    # print("Recognized: {}".format(args.result.text))
    # Check the result
    if args.result.reason == speechsdk.ResultReason.TranslatedSpeech:
        print("""Recognized: {}
    English translation: {}
    Korean translation: {}""".format(
            args.result.text, args.result.translations['en'], args.result.translations['ko']))
    elif args.result.reason == speechsdk.ResultReason.RecognizedSpeech:
        print("Recognized: {}".format(args.result.text))
    elif args.result.reason == speechsdk.ResultReason.NoMatch:
        print("No speech could be recognized: {}".format(
            args.result.no_match_details))
    elif args.result.reason == speechsdk.ResultReason.Canceled:
        print("Translation canceled: {}".format(
            args.result.cancellation_details.reason))
        if args.result.cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("Error details: {}".format(
                args.result.cancellation_details.error_details))

    counter += 1

def stop_cb( evt):
    """callback that stops continuous recognition upon receiving an event `evt`"""
    print('CLOSING on {}'.format(evt))
    speech_recognizer.stop_continuous_recognition()
    done = True


counter = 1

done = False

speech_recognizer.session_started.connect(lambda evt: print('SESSION STARTED: {}'.format(evt)))
speech_recognizer.session_stopped.connect(lambda evt: print('SESSION STOPPED {}'.format(evt)))

speech_recognizer.recognizing.connect(recognizing)
speech_recognizer.recognized.connect(recognized)

speech_recognizer.canceled.connect(lambda evt: print('CANCELED: {} ({})'.format(evt, evt.reason)))

speech_recognizer.session_stopped.connect(stop_cb)
speech_recognizer.canceled.connect(stop_cb)

speech_recognizer.start_continuous_recognition()

while not done:
    time.sleep(0.5)
