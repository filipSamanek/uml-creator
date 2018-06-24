import * as actionTypes from '../constants/ElementActionTypes'
import UuidGenerator from '../Services/UuidGenerator'
import undoable, { distinctState } from 'redux-undo'

var stateId = 0

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


function umlElementsReducer(state = initialState, action) {

    history.pushState(stateId++, null, "#" + UuidGenerator.generate())
    switch (action.type) {
        case actionTypes.ADD_ELEMENT:
            return [
                ...state,
                actionToElement(action)
            ]

        case actionTypes.ADD_MULTIPLE_ELEMENTS:
            return _.map(action.data, (element) => {
                return actionToElement(element)
            })

        case actionTypes.DELETE_ALL_ELEMENTS:
            return []

        case actionTypes.DELETE_ELEMENT:
            return state.filter(todo =>
                todo.id !== action.id
            )

        case actionTypes.EDIT_ELEMENT_POSITION:
            return state.map(element => {
                if(element.id === action.id){
                    element.position = action.position
                }
                return _.clone(element)
            })
        case actionTypes.EDIt_ELEMENT:
            return state.map(element => {
                if(element.id === action.id){
                    element.text = action.text
                    element.type = action.elementType
                }
                return _.clone(element)
            })
        case actionTypes.SELECT_ELEMENT:
            return state.map(element => {
                if(element.id === action.id){
                    element.selected = action.selected
                }
                return _.clone(element)
            })

        default:
            return state
    }
}

const undoableTodos = undoable(umlElementsReducer,  { filter: distinctState()})
export default undoableTodos