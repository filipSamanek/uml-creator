import React from 'react';
import { connect } from 'react-redux'

import {Row, Col, Grid} from 'react-bootstrap'
import UmlCanvas from '../components/UmlCanvas';
import {getSelectedElement} from "../Selector/umlElementSelector";
import * as ElementActions from '../actions/ElementActions'
import ElementService from '../elements/baseElement/services/ElementService'
import UmlElemntsPreview from "./UmlElemntsPreview";

class App extends React.Component {

    render() {
        return (
            <div id="modal-loader">
                <div className="modal-content">
                    <div className="spinner">Loading</div>
                </div>
            </div>
        );
    }
};

export default connect(App.mapStateToProps)(App);