import React from "react";

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace';

import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import './index.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


const annotations = [
    {
      row: 2, // must be 0 based
      column: 3, // must be 0 based
      text: "hello", // text to show in tooltip
      type: "error",
    //   e
    }
];

const markers = [
    {
      startRow: 0,
      startCol: 0,
      endRow: 0,
      endCol: 3,
      type: "text",
      className: "test-marker",
    }
  ];

function Editor(){
    const codeString = '(num) => num + 1';

    function onChange(newValue) {
        console.log("editor new value", newValue);
        
    }
    return(
        <div>
            <SyntaxHighlighter>
                <MarkerPopup/>
            </SyntaxHighlighter>

        </div>
    )
}

const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
);

function MarkerPopup() {
    const codeString = '(num) => num + 1';

    return(
        <OverlayTrigger
            trigger="hover"
            placement="right"
            overlay={popover}
            style={{width: 100}}
        >
            <div>
               {codeString}
            </div>
        </OverlayTrigger>
    )
}


String.prototype.splitOneCharacter = function(delim) {
    let ret=[];
    let splits=this.split(delim)
    let index=0
    for(let i = 0; i < splits.length; i++) {
        ret.push([index, splits[i]]);
        index += splits[i].length + 1;
    }
    return ret;
}


// Returns a random integer between min and max
Math.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) + min;
}

// Returns a word randomly picked from the editor along with its range


export default Editor;