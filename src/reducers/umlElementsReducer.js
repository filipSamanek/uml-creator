import * as actionTypes from '../constants/ElementActionTypes'
import UuidGenerator from '../Services/UuidGenerator'

const initialState = [
]

const actionToElement = action =>{
    return {
        id: action.id ? action.id : UuidGenerator.generate(),
        type: action.elementType,
        text: action.text,
        position: action.position,
        selected: action.selected
    }
}


export default function umlElementsReducer(state = initialState, action) {

    switch (action.type) {
        case actionTypes.ADD_ELEMENT:
            return [
                ...state,
                actionToElement(action)
            ]

        case actionTypes.DELETE_ELEMENT:
            return state.filter(todo =>
                todo.id !== action.id
            )

        case actionTypes.EDIT_ELEMENT_POSITION:
            return state.map(element => {
                if(element.id === action.id){
                    element.position = action.position
                }
                return element
            })
        case actionTypes.EDIt_ELEMENT:
            return state.map(element => {
                if(element.id === action.id){
                    element.text = action.text
                    element.type = action.elementType
                }
                return element
            })
        case actionTypes.SELECT_ELEMENT:
            return state.map(element => {
                if(element.id === action.id){
                    element.selected = action.selected
                }
                return element
            })

        default:
            return state
    }
}