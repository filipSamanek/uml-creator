import * as ElementTypes from '../../../constants/ElementTypes'
import BaseElementService from '../../baseElement/services/BaseElementService'

export default class StateService extends BaseElementService {
    constructor(position){
        super(position)
        this.ok = Math.abs((position.x2-position.x1)/(position.y2-position.y1))<5 &&
            Math.abs((position.y2-position.y1)/(position.x2-position.x1))<5
    }


    getElementType = () => (ElementTypes.ELEMENT_STATE)

    getRecognitionScore = (point) => {
        if(!this.ok){
            return Number.POSITIVE_INFINITY
        }
        return _.min([
            Math.pow(this.position.x1-point.x,2),
            Math.pow(this.position.x2-point.x,2),
            Math.pow(this.position.y1-point.y,2),
            Math.pow(this.position.y2-point.y,2)
        ])
    }
}