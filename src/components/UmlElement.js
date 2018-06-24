import React from "react";
import PropTypes from 'prop-types'
import ElementService from '../elements/baseElement/services/ElementService'


export default class UmlElement extends React.Component {
    static propTypes = {
        position: PropTypes.shape({
            x1: PropTypes.number.isRequired,
            y1: PropTypes.number.isRequired,
            x2: PropTypes.number.isRequired,
            y2: PropTypes.number.isRequired
        }).isRequired,
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        onUpdatePosition: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        elementId:PropTypes.string.isRequired,
        canBeSelected: PropTypes.bool.isRequired
    }



    render() {
        const { type, text, position}= this.props
        let height = position.y2 - position.y1
        let width = position.x2 - position.x1
        let Element = ElementService.elementTypeToComponentName(type)

        return (
            <Element position={position} text={text}
                                canBeSelected={this.props.canBeSelected}
                                onUpdatePosition={this.props.onUpdatePosition}
                                onSelect={this.props.onSelect}
                                elementId={this.props.elementId}/>
        )
    }
}