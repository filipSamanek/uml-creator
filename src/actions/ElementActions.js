import * as types from '../constants/ElementActionTypes'
import UuidGenerator from "../Services/UuidGenerator";

export const deleteElement =  (id) => ({type: types.DELETE_ELEMENT, id: id})
export const updatePosition = (position, id) => ({type: types.EDIT_ELEMENT_POSITION, id: id, position: position})
export const selectElement =  (selected, id) => ({type: types.SELECT_ELEMENT, id: id, selected:selected})
export const editElement = (data, id) => ({type: types.EDIt_ELEMENT, id: id, text: data.text, elementType: data.type})
export const createElement = (position, type) => {
    let pos = {
        x1: position.x1 || position.x,
        y1: position.y1 || position.y,
        x2: position.x2 || (position.x + 45),
        y2: position.y2 || (position.y + 45)
    }
    return {
        type: types.ADD_ELEMENT,
        id: UuidGenerator.generate(),
        text: "",
        elementType: type,
        position: pos,
        selected: false
    }
}
