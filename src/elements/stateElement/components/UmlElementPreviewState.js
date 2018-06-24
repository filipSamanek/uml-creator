import React from "react";
import BaseUmlElementPreview from "../../baseElement/components/BaseUmlElementPreview";
import * as ElementTypes from '../../../constants/ElementTypes'

export default class UmlElementPreviewState extends BaseUmlElementPreview {
    getType = () => {
        return  ElementTypes.ELEMENT_STATE
    }

    renderElement = () => {
        let position = this.props.position
        let w = this.props.width-2
        let h = this.props.height-2
        return(
            <rect x ={0} y={0} width={w} height={h} rx={10} ry={10} fill={this.getFill()} stroke={this.getStroke()} strokeWidth={this.getStrokeWidth()}
            />
        )
    }
}