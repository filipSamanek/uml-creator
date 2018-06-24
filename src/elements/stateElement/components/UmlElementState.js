import React from "react";
import BaseUmlElement from "../../baseElement/components/BaseUmlElement"
export default class UmlElementState extends BaseUmlElement {

    getResizePoint = () => {
        const position = this.props.position
        let ch = (position.y2 - position.y1)/2
        let cw = (position.x2 - position.x1)/2
        return [position.x1, position.y1, position.x2, position.y1, position.x2, position.y2, position.x1, position.y2, position.x1, position.y1]
    }

    handleResizeMovingStep2 = (dPos, pointId) => {
        let data = _.clone(this.props.position)
        switch (pointId){
            case 0:
            case 4:
                data.y1+=dPos.y
                data.x1+=dPos.x
                break
            case 1:
                data.x2+=dPos.x
                data.y1+=dPos.y
                break
            case 2:
                data.y2+=dPos.y
                data.x2+=dPos.x
                break
            case 3:
                data.x1+=dPos.x
                data.y2+=dPos.y
        }

        this.props.onUpdatePosition(data, this.props.elementId)

    }

    renderElement = () => {
        let position = this.props.position
        let w = position.x2 - position.x1
        let h = position.y2 - position.y1
        return(
            <rect x ={position.x1} y={position.y1} width={w} height={h} rx={10} ry={10} fill={this.getFill()} stroke={this.getStroke()} strokeWidth={this.getStrokeWidth()}
                  ref={this.refEl} key={this.props.elementId}
            />
        )
    }
}