import React from "react";
import BaseUmlElementPreview from "../../baseElement/components/BaseUmlElementPreview";
import * as ElementTypes from '../../../constants/ElementTypes'

export default class UmlElementPreviewArrow extends BaseUmlElementPreview {
    getType = () => {
        return  ElementTypes.ELEMENT_ARROW
    }

    renderElement = () => {
        const width = this.props.width
        const height = this.props.height
        let points =  [0, 0, width, height-7]

        return(
            <React.Fragment>
                <defs>
                    <marker id={"marker"} viewBox="0 0 10 10" refX="5" refY="5"
                            markerWidth="4" markerHeight="5"
                            stroke={this.getStroke()}
                            fill={this.getStroke()}
                            orient="auto-start-reverse"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" />
                    </marker>
                </defs>,
                <polyline points={points} fill={this.getFill()}
                          stroke={this.getStroke()} strokeWidth={this.getStrokeWidth()}
                          markerEnd={"url(#marker)"}
                />
            </React.Fragment>

        )
    }
}