var _ = require('lodash');

export default class BaseElementService {
    constructor(position){
        this.position = position
    }

    pointFromLine = (point, line_end, line_start) => {
        return Math.pow(
            point.x * (line_end.y - line_start.y) -
            point.y * (line_end.x - line_start.x) +
            line_end.x * line_start.y -
            line_end.y * line_start.x
            ,2) / (
            (line_end.y - line_start.y) * (line_end.y - line_start.y) +
            (line_end.x - line_start.x) * (line_end.x - line_start.x)
        )

    }

    getRecognitionScore = (point) => {
        throw new Error('You have to implement the method getRecognitionScore!');
    }

    getElementType = () => {
        throw new Error('You have to implement the method getElementType!');
    }

    getElementScoreAndType = (path) => {
        let score = 0
        _.each(path, (point) => {
            score += this.getRecognitionScore(point)
        })
        return {
            score: score,
            type: this.getElementType()
        }
    }




}