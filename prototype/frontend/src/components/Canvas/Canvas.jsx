import React from 'react';
import CanvasDraw from 'react-canvas-draw';

class CanvasContainer extends React.Component {

    getSaveData() {
        console.log(this.refs.CanvasDraw.getSaveData());
    }

    render() {
        return (
            <div>
                <CanvasDraw
                    // saveData={true}
                    ref="CanvasDraw"
                    brushRadius={5}
                    hideGrid={true}
                />
                <button onClick={() => this.getSaveData()}>
                    Compile
                </button>
                <button onClick={() => this.refs.CanvasDraw.clear()}>
                    Clear
                </button>
                <button onClick={() => this.refs.CanvasDraw.undo()}>
                    Undo
                </button>
            </div>
        )
    }
}

class Canvas extends React.Component {
    render() {
        return (
            <CanvasDraw
                ref="CanvasDraw"
            />
        )
    }
}

export default CanvasContainer;