import React from "react";
import PropTypes from 'prop-types'
import UmlResizePoint from './UmlResizePoint'
import DragableElement from './DragableElement'

export default class BaseUmlElement extends DragableElement {

    static propTypes = {
        position: PropTypes.shape({
            x1: PropTypes.number.isRequired,
            y1: PropTypes.number.isRequired,
            x2: PropTypes.number.isRequired,
            y2: PropTypes.number.isRequired
        }).isRequired,
        text: PropTypes.string.isRequired,
        onUpdatePosition: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        elementId:PropTypes.string.isRequired,
        canBeSelected: PropTypes.bool.isRequired
    }

    refText = undefined

    constructor(props) {
        super(props)
        this.refText = React.createRef()
        this.state.selected = false
        this.moving = true
    }

    componentDidMount() {
        super.componentDidMount()
        this.element.addEventListener('click', this.handleClick)
        let textElement = this.refText.current
        textElement.addEventListener("click", this.handleClick)
        textElement.addEventListener("mousedown", this.handleMouseDown)
        textElement.addEventListener("touchstart", this.handleMouseDown)
        this.centerText()
    }

    componentDidUpdate = () => {
        this.centerText()
    }

    handleClick = e => {
        if(!this.props.canBeSelected){
            return
        }
        if(!this.state.selected){
            this.parentEl.addEventListener('click', this.handleClickDisable, true);
        }
        this.setState({selected:true})
        this.props.onSelect(true, this.props.elementId)
        e.stopPropagation()
    }

    handleClickDisable = e => {
        if(this.moving){
            this.moving = false
            return
        }
        this.parentEl.removeEventListener('click', this.handleClick);
        this.setState({selected:false})
        this.props.onSelect(false, this.props.elementId)
    }

    hadleDraging = dPos => {
        let data = {
            x1: this.props.position.x1 + dPos.x,
            x2: this.props.position.x2 + dPos.x,
            y1: this.props.position.y1 + dPos.y,
            y2: this.props.position.y2 + dPos.y
        }

        this.props.onUpdatePosition(data, this.props.elementId)
        this.centerText()
    }


    handleResizeMovingStep1 = (dPos, id) => {
        this.moving = true
        this.handleResizeMovingStep2(dPos, id)
    }

    handleResizeMovingStep2 = (dPos, id) => {
        throw new Error('You have to implement the method handleMoving!');
    }

    centerText = () =>{
        let textElement = this.refText.current
        let bbox = textElement.getBBox()
        let position = this.props.position
        let x = position.x1 + (position.x2 - position.x1)/2 - bbox.width/2
        let y = position.y1 + (position.y2 - position.y1)/2 + bbox.height/2
        textElement.setAttribute("x", x)
        textElement.setAttribute("y", y)
    }

    getStrokeWidth = () => (3)

    getStroke = () => (this.state.selected ? "#4c4c4c" : "black")

    getFill = () => (this.state.selected ? "#e7e7e7" : "white")

    getResizePoint = () => {
        throw new Error('You have to implement the method getResizePoints!');
    }

    renderElement = () => {
        throw new Error('You have to implement the method renderElement!');
    }

    renderResizePoints = () => {
        var points = []
        let data = this.getResizePoint()
        for(let i =0; i<data.length; i+=2){
            points.push({position: {x: data[i], y: data[i+1]}, id: i/2})
        }
        if(this.state.selected) {
            return (
                _.map(points, point => (
                    <UmlResizePoint key={point.id} elementId={point.id} position={point.position}
                                    onUpdatePosition={this.handleResizeMovingStep1}/>
                ))
            )
        }else{
            return []
        }
    }

    renderText = () => {
        let position = {
            x: this.props.position.x1,
            y: this.props.position.y1
        }
        return (
            <text key={"text"} ref={this.refText} x={position.x} y={position.y} style={{fontWeight:"bold"}}>
                {this.props.text}
            </text>
        )
    }

    render() {

        return (
            [this.renderElement(), this.renderText(), ...this.renderResizePoints()]
        );
    }
}