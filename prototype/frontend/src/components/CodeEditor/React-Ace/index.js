import React from "react";

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace';

import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


function Editor(){
    
    function onChange(newValue) {
        console.log("editor new value", newValue);
    }
    return(
        <div>
        <AceEditor
            mode="java"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{
                $blockScrolling: true
            }}
            value="hello world"
            id="#editor"
        />
        <MarkerPopup/>
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
    return(
        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
            <Button variant="success">Click me to see</Button>
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