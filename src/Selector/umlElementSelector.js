import { createSelector } from 'reselect'

const getElements = state => state.umlElementsReducer

export const getSelectedElement = createSelector(
    getElements,
    (elements) => {
        return elements.filter(e => e.selected)
    }
)