import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ModalLoader from "./ModalLoader"
import * as ElementActions from '../actions/ElementActions'
import {Form, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import ApiService from "../Services/ApiService";

class SelectProject extends React.Component {

    state = {
        loading: false
    }

    static propTypes = {
        onProjectLoaded: PropTypes.func.isRequired
    }


    static mapStateToProps = state => ({
    })

    handleSubmitForm = formData => {
        formData.preventDefault()
        this.setState({loading:true})
        let project = formData.target.text.value

        ApiService.getData(project)
            .then((response) => {
                response.json().then(data => {
                    this.props.dispatch(ElementActions.deleteAll())
                    this.props.dispatch(ElementActions.loadData(data))
                    this.setState({loading:false});
                    console.log(data)
                    this.props.onProjectLoaded(project)
                });

            })

    }

    render() {
        return (
            <div>
                <h1>UML diagram creaetor 1.0</h1>
                <Form horizontal onSubmit={this.handleSubmitForm}>
                    <FormGroup controlId={"text"}>
                        <Col componentClass={ControlLabel} xs={3}>
                            Jméno projektu:
                        </Col>
                        <Col xs={8}>
                            <FormControl type={"text"} name={"text"}/>
                        </Col>
                    </FormGroup>
                    <Button type="submit">Načíst</Button>
                </Form>
                {this.state.loading?<ModalLoader/>:""}
        </div>
        );
    }
};

export default connect(SelectProject.mapStateToProps)(SelectProject);