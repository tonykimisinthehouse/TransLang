import React from 'react';

function InkCanvas(props) {

    const { width, height, context } = props;
    this.width = (typeof (width) === "undefined") ? 500 : width;
    this.height = (typeof (height) === "undefined") ? 500 : height;
    this.context = "2d"

    state = {
        // Stroke related members
        points: [],
        strokes: [],
        strokesStarted: false
    }

    // Register event handlers
}

export default InkCanvas;