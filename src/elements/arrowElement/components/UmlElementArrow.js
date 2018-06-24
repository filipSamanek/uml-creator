import React from "react";
import BaseUmlElement from "../../baseElement/components/BaseUmlElement";


export default class UmlElementArrow extends BaseUmlElement {

    getPolylinePoints = () => {
        const position = this.props.position
        return  [position.x1, position.y1, position.x2, position.y2-7]
    }

    getResizePoint = () => {
        return this.getPolylinePoints()
    }

    getStrokeWidth = () => {
        return this.state.selected? 5 : 4
    }

    handleResizeMovingStep2 = (dPos, pointId) => {
        let data = _.clone(this.props.position)
        if(pointId==0){
            data.x1+=dPos.x
            data.y1+=dPos.y
        }else{
            data.x2+=dPos.x
            data.y2+=dPos.y
        }

        this.props.onUpdatePosition(data, this.props.elementId)

    }

    renderElement = () => {
        let points = this.getPolylinePoints()
        let markerEnd = "url(#" + this.props.elementId + ")"
        return(
            <React.Fragment key={"arrow"}>
                <defs>
                    <marker id={this.props.elementId} viewBox="0 0 10 10" refX="5" refY="5"
                            markerWidth="4" markerHeight="7"
                            stroke={this.getStroke()}
                            fill={this.getStroke()}
                            orient="auto-start-reverse"
                            onClick={this.handleClick}
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" />
                    </marker>
                </defs>
                <polyline points={points} fill={this.getFill()} stroke={this.getStroke()} strokeWidth={this.getStrokeWidth()} markerEnd={markerEnd}
                      ref={this.refEl} key={this.props.elementId}
                />
            </React.Fragment>
        )
    }
}