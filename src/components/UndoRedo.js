import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import {Row, Col, Button} from 'react-bootstrap'

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
    <Row>
        <Col xs={12}>
            <Button onClick={onUndo} disabled={!canUndo}>
                Zpet
            </Button>
            <Button onClick={onRedo} disabled={!canRedo}>
                Dopředu
            </Button>
        </Col>
    </Row>
)

const mapStateToProps = (state) => ({
    canUndo: state.umlElementsReducer.past.length > 0,
    canRedo: state.umlElementsReducer.future.length > 0
})

const mapDispatchToProps = ({
    onUndo: UndoActionCreators.undo,
    onRedo: UndoActionCreators.redo
})

UndoRedo = connect(
    mapStateToProps,
    mapDispatchToProps
)(UndoRedo)

export default UndoRedo