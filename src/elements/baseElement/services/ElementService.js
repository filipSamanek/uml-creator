import * as ElementTypes from '../../../constants/ElementTypes'

import UmlElementDecision from "../../decisionElement/components/UmlElementDecision";
import UmlElementArrow from "../../arrowElement/components/UmlElementArrow";
import UmlElementState from "../../stateElement/components/UmlElementState";

import BaseEditForm from '../components/BaseEditForm'
import UmlElementPreviewState from "../../stateElement/components/UmlElementPreviewState";
import UmlElementPreviewArrow from "../../arrowElement/components/UmlElementPreviewArrow";
import UmlElementPreviewDecision from "../../decisionElement/components/UmlElementPreviewDecision";
import StateService from "../../stateElement/service/StateService";
import ArrowService from "../../arrowElement/service/ArrowService";
import DecisionService from "../../decisionElement/service/DecisionService";


export default class ElementService{
    static elementTypeToComponentName = elementType => {
        switch (elementType) {
            case ElementTypes.ELEMENT_ARROW:
                return  UmlElementArrow
            case ElementTypes.ELEMENT_DECISION:
                return UmlElementDecision
            case ElementTypes.ELEMENT_STATE:
                return UmlElementState
        }
    }

    static elementTypeToFormComponentName = elementType => {
        switch (elementType) {
            default:
                return BaseEditForm

        }
    }

    static getElementsPreviewComponent = () => {
        return [UmlElementPreviewState, UmlElementPreviewArrow, UmlElementPreviewDecision]
    }

    static getElementsService = () => {
        return [StateService, ArrowService, DecisionService]
    }

    static getElementTypeFromPath = (path) => {
        const position = {
            x1: _.minBy(path, (point)=>(point.x)).x,
            x2: _.maxBy(path, (point)=>(point.x)).x,
            y1: _.minBy(path, (point)=>(point.y)).y,
            y2: _.maxBy(path, (point)=>(point.y)).y
        }
        let max = {score: Infinity}

        _.each(ElementService.getElementsService(), (service) => {
            let serviceObj = new service(position)
            let res = serviceObj.getElementScoreAndType(path)
            if(res.score<max.score){
                max = res
            }
        })

        return {
            position: position,
            type: max.type
        }
    }


}