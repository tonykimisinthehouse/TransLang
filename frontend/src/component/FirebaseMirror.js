import React, { Component } from 'react';
import Firebase, { FirebaseContext } from './Firebase';
// import Firepad from 'firepad';
import CodeMirror from 'codemirror';

class FirebaseMirror extends Component {
    // componentDidMount() {

    //     let firepadRef = this.getExampleRef();
    //     let codeMirrorRef = CodeMirror(document.getElementById('firepad-container'), { lineWrapping: true });
    //     let firepad = Firepad.fromCodeMirror(firepadRef, codeMirrorRef);

    //     firepad.on('ready', function() {
    //         if (firepad.isHistoryEmpty()) {
    //             firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');

    //         }
    //     })
    // }

      // Helper to get hash from end of URL or generate a random one.
  getExampleRef() {
    var ref = window.firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }

  render() {
    return (
        <div>
            <div id="firepad-container"></div>
            <FirebaseContext.Consumer>
                {firebase => {
                    return <div>I've access to Firebase and render something.</div>;
                }}
            </FirebaseContext.Consumer>
        </div>

    );
  }
}

export default FirebaseMirror;