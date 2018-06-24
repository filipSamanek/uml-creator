import React from 'react';
import PropTypes from 'prop-types'
import {Row, Col, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import ApiService from "../Services/ApiService";
import * as ElementActions from "../actions/ElementActions";
import ModalLoader from "./ModalLoader"
class WorkWithProject extends React.Component{

    state = {
        loading: false,
        online: true
    }

    static propTypes = {
        onNewProject: PropTypes.func.isRequired,
    }


    static mapStateToProps = state => ({
        elements: state.umlElementsReducer
    })

    componentDidMount = () => {
        this.setState({online: navigator.onLine})
        window.addEventListener("online", this.handleOnline)
        window.addEventListener("offline", this.handleOffline)
    }

    handleSave = () => {
        this.setState({loading:true})
        ApiService.saveData(this.state.elements).then((data)=>{
            this.setState({loading:false})
        })
    }

    handleDelete = () => {
        this.props.dispatch(ElementActions.deleteAll())
    }

    handleOnline = () => {
        this.setState({online:true})
    }

    handleOffline = () => {
        this.setState({online:false})
    }

    render(){
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <Button disabled={!this.state.online} onClick={this.handleSave}>Uložit</Button>
                        <Button onClick={this.handleDelete}>Smazat vše</Button>
                        <Button onClick={this.props.onNewProject}>Nový projekt</Button>
                    </Col>
                </Row>
                {this.state.loading?<ModalLoader/>:""}
            </div>


        )


    }
}

export default connect(WorkWithProject.mapStateToProps)(WorkWithProject);