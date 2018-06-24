import React from 'react';
import { connect } from 'react-redux'

import {Row, Col, Grid} from 'react-bootstrap'
import UmlCanvas from '../components/UmlCanvas';
import {getSelectedElement} from "../Selector/umlElementSelector";
import * as ElementActions from '../actions/ElementActions'
import ElementService from '../elements/baseElement/services/ElementService'
import UmlElemntsPreview from "./UmlElemntsPreview";
import ModalLoader from "./ModalLoader"

class App extends React.Component {

    state = {
        selectProject: true,
        loading: false
    }

    editElement = (data, id) => {
        this.props.dispatch(ElementActions.editElement(data, id))
    }

    deleteElement = (id) => {
        this.props.dispatch(ElementActions.deleteElement(id))
    }

    static mapStateToProps = state => ({
        element: (getSelectedElement(state)[0])
    })

    render() {
        let EditForm
        if(this.props.element) {
            EditForm = ElementService.elementTypeToFormComponentName(this.props.element.type)
        }
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={9}>
                        {this.state.selectProject?"":<UmlCanvas />}
                    </Col>
                    {this.state.selectProject?"":(
                        <Col xs={12} md={3}>
                            <Row>
                                <Col xs={12}>
                                    <UmlElemntsPreview/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    {this.props.element ?<hr />:""}
                                    {this.props.element ?<EditForm element={this.props.element} onDelete={this.deleteElement} onSave={this.editElement}/>:""}
                                </Col>
                            </Row>
                        </Col>
                    )}
                </Row>
                {this.state.loading?<ModalLoader/>:""}
            </Grid>

        );
    }
};

export default connect(App.mapStateToProps)(App);