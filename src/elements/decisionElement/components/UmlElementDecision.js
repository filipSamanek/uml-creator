import React from "react";
import PropTypes from 'prop-types'
import BaseUmlElement from "../../baseElement/components/BaseUmlElement"
export default class UmlElementDecision extends BaseUmlElement {

    getResizePoint = () => {
        const position = this.props.position
        let ch = (position.y2 - position.y1)/2
        let cw = (position.x2 - position.x1)/2
        return [position.x1 + cw, position.y1, position.x2, position.y1+ch, position.x1+cw, position.y2, position.x1, position.y1+ch, position.x1 + cw, position.y1]
    }


    handleResizeMovingStep2 = (dPos, pointId) => {
        let data = _.clone(this.props.position)
        switch (pointId){
            case 0:
            case 4:
                data.y1+=dPos.y
                break
            case 1:
                data.x2+=dPos.x
                break
            case 2:
                data.y2+=dPos.y
                break
            case 3:
                data.x1+=dPos.x
        }

        this.props.onUpdatePosition(data, this.props.elementId)

    }

    renderElement = () => {
        let points = this.getResizePoint()
        return(
            <polyline points={points} fill={this.getFill()} stroke={this.getStroke()} strokeWidth={this.getStrokeWidth()}
                      ref={this.refEl} key={this.props.elementId}
            />
        )
    }
}