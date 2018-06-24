import React from "react";
import BaseUmlElementPreview from "../../baseElement/components/BaseUmlElementPreview";
import * as ElementTypes from '../../../constants/ElementTypes'

export default class UmlElementPreviewDecision extends BaseUmlElementPreview {
    getType = () => {
        return  ElementTypes.ELEMENT_DECISION
    }

    renderElement = () => {
        const width = this.props.width -2
        const height = this.props.height -2
        let ch = height/2
        let cw = width/2
        let points =  [cw, 0, width, ch, cw, height, 0, ch, cw, 0]

        return(
            <polyline points={points} fill={this.getFill()}
                      stroke={this.getStroke()} strokeWidth={this.getStrokeWidth()}
            />
        )
    }
}