import React from 'react';

// referenced from https://pspdfkit.com/blog/2017/how-to-build-free-hand-drawing-using-react/
function Drawing({ lines }) {
    return (
        <svg className="drawing">
            {lines.map((line, index) => (
                <DrawingLine key={index} line={line} />
            ))}
        </svg>
    );
}
  
function DrawingLine({ line }) {
    const pathData = "M " +
        line
        .map(p => {
            return `${p.get('x')} ${p.get('y')}`;
        })
        .join(" L ");

    return <path className="path" d={pathData} />;
}

  export default Drawing;