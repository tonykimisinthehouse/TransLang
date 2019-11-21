import React from 'react';

class ClearButton extends React.Component {
    constructor(props) {
        state = {
            isEnabled: props.canUndo
        }
    }
    render() {
        const isEnabled = this.state;
        return (
            <div onClick={if (isEnabled) => }>
                Clear Button
            </div>
        )
    }
}

export default ClearButton;
