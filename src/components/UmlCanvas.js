import React from "react";
import { connect } from 'react-redux'
import * as ElementActions from '../actions/ElementActions'
import styles from '../styles/umlCanvas.css'
import UmlElement from './UmlElement'
import {Row, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton, Label} from 'react-bootstrap'
import ElementService from "../elements/baseElement/services/ElementService";

class UmlCanvas extends React.Component {

    constructor(){
        super()
        this.ref = React.createRef()
        this.posX = undefined
        this.posY = undefined
        this.canDraw = false
        this.drawing = false
        this.drawingElement = undefined
        this.elementPoints = undefined

        this.refCanvasSvg = React.createRef()
    }



    static mapStateToProps = state => ({
        elements: state.umlElementsReducer
    })

    componentDidMount = () => {
        let pos = this.ref.current.getBoundingClientRect()
        this.posX = pos.x
        this.posY = pos.y
    }


    onUpdatePosition = (position, id) => {
        if(this.canDraw){
            return
        }else {
            this.props.dispatch(ElementActions.updatePosition(position, id))
        }
    }

    getMousePos = e => {
        if(e.type === "touchstart" || e.type === "touchmove"){
            return {x: e.touches[0].pageX, y: e.touches[0].pageY}
        }else{
            return {x: e.pageX, y: e.pageY}
        }
    }

    handleMouseDown = (e) => {
        if(!this.canDraw || this.drawing){
            return
        }
        this.elementPoints = []
        this.drawing = true
        const path = document.createElementNS('http://www.w3.org/2000/svg',"path");
        path.setAttributeNS(null, 'stroke', 'black');
        path.setAttributeNS(null, 'stroke-width', '3px');
        path.setAttributeNS(null, 'fill', 'white');

        this.refCanvasSvg.current.appendChild(path);
        this.drawingElement = path;
        this.refCanvasSvg.current.addEventListener('mousemove', this.handleMouseMove, {passive:false})
        this.refCanvasSvg.current.addEventListener('touchmove', this.handleMouseMove, {passive: false})
    }

    handleMouseMove = (e) =>{
        if(!this.drawing){
            return
        }

        let coord = this.getMousePos(e)
        let x = coord.x-this.posX
        let y = coord.y-this.posY
        this.elementPoints.push({x:x, y:y})
        let d = this.drawingElement.getAttributeNS(null, 'd') || `M ${x} ${y}`;
        d += ` L ${x} ${y}`;
        this.drawingElement.setAttributeNS(null, 'd', d);

        e.preventDefault()
    }


    handleMouseUp = (e) => {
        if(!this.drawing){
            return false
        }
        try {
            if(this.elementPoints.length>0){
                let element = ElementService.getElementTypeFromPath(this.elementPoints)
                this.props.dispatch(ElementActions.createElement(element.position, element.type))
            }

        }catch (e) {
            console.log(e)
        }
        this.refCanvasSvg.current.removeChild(this.drawingElement)


        this.drawing = false
        this.refCanvasSvg.current.removeEventListener('mousemove', this.handleMouseMove)
        this.refCanvasSvg.current.removeEventListener('touchmove', this.handleMouseMove)
    }



    handleDragOver = (e) => {
        e.preventDefault()
    }

    handleDragEnter = (e) => {
        e.preventDefault()
    }

    handleDrop = (e) => {
        const umlElementName = e.dataTransfer.getData("umlElementType")
        if(!umlElementName) return;
        const pos = {
            x: e.clientX-this.posX,
            y: e.clientY-this.posY
        }
        this.props.dispatch(ElementActions.createElement(pos, umlElementName))
    }

    selectElement = (selected, id) => {
        if(this.canDraw){
            return
        }else {
            this.props.dispatch(ElementActions.selectElement(selected, id))
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={8}>
                        <h1 className={styles.title}>UML diagram creaetor 1.0</h1>
                    </Col>
                    <Col xs={4}>
                        <ButtonToolbar className={"pull-right"}>
                            <ToggleButtonGroup onChange={(e)=>{this.canDraw=e}} type="radio" name="drawingSwitch" defaultValue={false}>
                                <ToggleButton value={false}>OFF</ToggleButton>
                                <ToggleButton value={true}>On</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                        <Label className={"pull-right"}>Kreslící mód</Label>
                    </Col>
                </Row>
                <div ref={this.ref} className={styles.canvas}
                     onDrop={this.handleDrop}
                     onDragOver={this.handleDragOver}
                >
                    <svg ref={this.refCanvasSvg} width={"100%"} height={"100%"}
                         onMouseDown={this.handleMouseDown}
                         onMouseUp={this.handleMouseUp}
                         onTouchStart={this.handleMouseDown}
                         onTouchEnd={this.handleMouseUp}
                    >

                        {_.map(this.props.elements, element =>
                            <UmlElement key={element.id} elementId={element.id} position={element.position}
                                        type={element.type} text={element.text}
                                        onUpdatePosition={this.onUpdatePosition}
                                        onSelect={this.selectElement}
                                        canBeSelected={!this.canDraw}
                            />
                        )}
                    </svg>
                </div>
            </div>
        );
    }
}


export default connect(
    UmlCanvas.mapStateToProps
)(UmlCanvas)