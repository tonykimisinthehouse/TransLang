import React, {useState} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python.js');
require('codemirror/addon/selection/active-line.js')



const options = {
  mode: 'python',
  theme: 'material',
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,

  // readOnly: 'noCursor',
  gutters: ["CodeMirror-linenumbers", "breakpoints"]
};

function CodeMirrorComponent(props) {
  let defaultValue =
  `def length(item):
  if not item:
    return 1
  else:
    return 1 + length(item[1:])

print(length('CS 1301'))
  `

  const [value, setValue] = useState(
    defaultValue);
  const readOnly = props.readOnly;
  if (readOnly) {
    options.readOnly = 'noCursor'
  }

  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#fff";
    marker.innerHTML = "⮕";
    return marker;
  }

  return (
    <CodeMirror
  value={value}
  options={options}
  onBeforeChange={(editor, data, value) => {
    setValue(value);
  }}
  onGutterClick={(editor, data, value) => {
    let info = editor.lineInfo(data);
    console.log("Line", data + 1, " clicked")
    console.log("Line info:", info);
    editor.setGutterMarker(data, "breakpoints", info.gutterMarkers ? null : makeMarker());
  }}
  onChange={(editor, value) => {
    console.log('controlled', {value});
  }}
/>
  )


}

export default CodeMirrorComponent;