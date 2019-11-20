import React from "react";

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace';


import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


function Editor(){
    
    function onChange(newValue) {
        console.log("editor new value", newValue);
    }
    return(
        <AceEditor
            mode="java"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{
                $blockScrolling: true
            }}
        />
    )
}

export default Editor;