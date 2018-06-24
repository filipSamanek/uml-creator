import React from "react";
import PropTypes from 'prop-types'
import {Form, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'

export default class BaseEditForm extends React.Component {
    static propTypes = {
        element: PropTypes.object.isRequired,
        onSave: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
    }

    handleSubmitForm = formData => {
        let data = {
            text: formData.target.text.value,
            type: formData.target.type.value
        }
        this.props.onSave(data, this.props.element.id)
        formData.preventDefault()
    }

    handleDelete = e => {
        this.props.onDelete(this.props.element.id)
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <h2>Úprava elementu</h2>
                <Form horizontal onSubmit={this.handleSubmitForm}>
                    <FormGroup controlId={"type"}>
                        <Col componentClass={ControlLabel} xs={3}>
                            Typ:
                        </Col>
                        <Col xs={8}>
                            <FormControl componentClass={"select"} name={"type"} defaultValue={this.props.element.type}>
                                <option value="arrow">Šipka</option>
                                <option value="decision">Podmínka</option>
                                <option value="state">Stav</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId={"text"}>
                        <Col componentClass={ControlLabel} xs={3}>
                            Text:
                        </Col>
                        <Col xs={8}>
                            <FormControl type={"text"} defaultValue={this.props.element.text} name={"text"} placeholder={"Text UML element"} />
                        </Col>
                    </FormGroup>
                    <Button type="submit">Uložit</Button>
                    <Button type="button" onClick={this.handleDelete}>Smazat</Button>
                </Form>
            </div>
        )

    }


}