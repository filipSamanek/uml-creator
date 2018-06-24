import React from "react";
import ReactDOM from "react-dom"

export default class DragableElement extends React.Component {
    refEl = undefined
    parentEl = undefined
    mouseCoords = {x:undefined, y:undefined}
    element = undefined



    state = {
        inMove: false
    }

    constructor() {
        super()
        this.refEl = React.createRef()
    }

    componentDidMount() {
        this.parentEl = ReactDOM.findDOMNode(this).parentNode
        this.element = this.refEl.current
        this.element.addEventListener("mousedown", this.handleMouseDown)
        this.element.addEventListener("touchstart", this.handleMouseDown)
    }

    getMousePos = e => {
        if(e.type === "touchstart" || e.type === "touchmove"){
            return {x: e.touches[0].pageX, y: e.touches[0].pageY}
        }else{
            return {x: e.pageX, y: e.pageY}
        }
    }

    handleMouseDown = e => {
        this.mouseCoords = this.getMousePos(e)
        this.parentEl.addEventListener('mousemove', this.handleMouseMove)
        this.parentEl.addEventListener('touchmove', this.handleMouseMove)
        this.parentEl.addEventListener("mouseup", this.handleMouseUp)
        this.parentEl.addEventListener("touchend", this.handleMouseUp)

        this.setState({inMove:true})
    }

    handleMouseMove = e => {
        let mouseCoord = this.getMousePos(e)
        let coordDif = {
            x: mouseCoord.x - this.mouseCoords.x,
            y: mouseCoord.y - this.mouseCoords.y
        }

        this.mouseCoords = mouseCoord

        this.hadleDraging(coordDif)
        e.preventDefault()

    }

    handleMouseUp = e =>{
        this.parentEl.removeEventListener("mousemove", this.handleMouseMove)
        this.parentEl.removeEventListener('touchmove', this.handleMouseMove)
    }

    afterMouseUp = () => {}

    handleDraging = dPos => {
        throw new Error('You have to implement the method handleDragign!');
    }
}