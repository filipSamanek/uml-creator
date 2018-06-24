import * as ElementTypes from '../../../constants/ElementTypes'
import BaseElementService from '../../baseElement/services/BaseElementService'

export default class ArrowService extends BaseElementService {
    constructor(position){
        super(position)
        this.p = {
            start: {
                x: position.x1,
                y: position.y1
            },
            end: {
                x: position.x2,
                y: position.y2
            }
        }
    }

    getElementType = () => (ElementTypes.ELEMENT_ARROW)

    getRecognitionScore = (point) => {
        return this.pointFromLine(point, this.p.start, this.p.end)
    }
}