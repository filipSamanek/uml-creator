import React from 'react';
import { connect } from 'react-redux'

import {Row, Col, Grid} from 'react-bootstrap'
import UmlCanvas from '../components/UmlCanvas';
import {getSelectedElement} from "../Selector/umlElementSelector";
import * as ElementActions from '../actions/ElementActions'
import ElementService from '../elements/baseElement/services/ElementService'
import UmlElemntsPreview from "./UmlElemntsPreview";
import SelectProject from "./SelectProject"
import WorkWithProject from "./WorkWithProject";
import UndoRedo from "./UndoRedo"
import { ActionCreators as UndoActionCreators } from 'redux-undo'

class App extends React.Component {

    state = {
        selectProject: true,
    }

    stateId = undefined

    componentDidMount = e => {
        window.onpopstate = this.onBackButtonEvent;
    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
        if(this.stateId<e.state){
            this.props.dispatch(UndoActionCreators.redo())
        }else{
            this.props.dispatch(UndoActionCreators.undo())
        }
        this.stateId = e.state
        console.log(e.state)

    }

    editElement = (data, id) => {
        this.props.dispatch(ElementActions.editElement(data, id))
    }

    deleteElement = (id) => {
        this.props.dispatch(ElementActions.deleteElement(id))
    }

    handleProjectLoaded = (projectName) => {
        this.setState({selectProject:false})
    }

    handleLoadNewProject = () => {
        this.setState({selectProject: true})
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
                        {this.state.selectProject?<SelectProject onProjectLoaded={this.handleProjectLoaded}/>:<UmlCanvas/>}
                    </Col>
                    {this.state.selectProject?"":(
                        <Col xs={12} md={3}>
                            <Row>
                                <Col className={"bordered"} xs={12}>
                                    <UmlElemntsPreview/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    {this.props.element ?<hr />:""}
                                    {this.props.element ?<EditForm element={this.props.element} onDelete={this.deleteElement} onSave={this.editElement}/>:""}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <hr />
                                    <UndoRedo onNewProject={this.handleLoadNewProject}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <hr />
                                    <WorkWithProject onNewProject={this.handleLoadNewProject}/>
                                </Col>
                            </Row>
                        </Col>
                    )}
                </Row>

            </Grid>

        );
    }
};

export default connect(App.mapStateToProps)(App);