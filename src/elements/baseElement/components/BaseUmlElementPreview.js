import React from 'react';
import PropTypes from 'prop-types'

export default class BaseUmlElementPreview extends React.Component{
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }

    handleDragStart = (e) => {
        e.dataTransfer.setData("umlElementType", this.getType());
    }




    getStrokeWidth = () => (3)

    getStroke = () => ("black")

    getFill = () => ("white")

    getType = () =>{
        throw new Error('You have to implement the method getType!');
    }
    renderElement = () => {
        throw new Error('You have to implement the method renderElement!');
    }
    render() {
        return (
            <div draggable onDragStart={this.handleDragStart}>
            <svg viewBox="-5 -5 55 55" width="100%" height="50px">
                {this.renderElement()}
            </svg>
            </div>
        )
    }


}