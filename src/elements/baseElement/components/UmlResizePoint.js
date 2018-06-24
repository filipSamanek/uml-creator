import React from "react";
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import DragableElement from './DragableElement'

export default class UmlResizePoint extends DragableElement {
    static propTypes = {
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }).isRequired,
        onUpdatePosition: PropTypes.func.isRequired,
        elementId:PropTypes.number.isRequired
    }

    hadleDraging = dPos => {
        this.props.onUpdatePosition(dPos, this.props.elementId)
    }

    getStrokeWidth = () => (3)

    getStroke = () => ("black")

    getFill = () => (this.state.selected ? "#fff32b" : "white")

    render() {
        return (
            <circle cx={this.props.position.x} cy={this.props.position.y} r={"8"} stroke={this.getStroke()}
                    strokeWidth={this.getStrokeWidth()} fill={this.getFill()}
                    ref={this.refEl}
                    style={{zIndex: 10}}

            />
        );
    }
}