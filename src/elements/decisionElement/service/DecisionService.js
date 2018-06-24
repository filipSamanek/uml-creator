import * as ElementTypes from '../../../constants/ElementTypes'
import ElementService from "../../baseElement/services/ElementService";
import BaseElementService from '../../baseElement/services/BaseElementService'

export default class DecisionService extends BaseElementService {
    constructor(position){
        super(position)

        this.ok = Math.abs((position.x2-position.x1)/(position.y2-position.y1))<5 &&
            Math.abs((position.y2-position.y1)/(position.x2-position.x1))<5

        const xCenter = position.x1+(position.x2-position.x1)/2
        const yCenter = position.y1+(position.y2-position.y1)/2

        this.p1 = {
            start: {
                x: xCenter,
                y: position.y1
            },
            end: {
                x: position.x1,
                y: yCenter,
            }
        }

        this.p2 = {
            start: {
                x: xCenter,
                y: position.y1
            },
            end: {
                x: position.x2,
                y: yCenter,
            }
        }

        this.p3 = {
            start: {
                x: xCenter,
                y: position.y2
            },
            end: {
                x: position.x2,
                y: yCenter,
            }
        }

        this.p4 = {
            start: {
                x: xCenter,
                y: position.y2
            },
            end: {
                x: position.x1,
                y: yCenter,
            }
        }

    }

    getElementType = () => (ElementTypes.ELEMENT_DECISION)

    getRecognitionScore = (point) => {
        if(!this.ok){
            return Number.POSITIVE_INFINITY
        }
        return _.min([
            this.pointFromLine(point, this.p1.start, this.p1.end),
            this.pointFromLine(point, this.p2.start, this.p2.end),
            this.pointFromLine(point, this.p3.start, this.p3.end),
            this.pointFromLine(point, this.p4.start, this.p4.end)
        ])
    }


}