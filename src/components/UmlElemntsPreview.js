import React from 'react';
import ElementService from '../elements/baseElement/services/ElementService'
import {Row, Col, Grid} from 'react-bootstrap'
import UuidGenerator from "../Services/UuidGenerator";
import UmlElement from "./UmlElement";

export default class UmlElemntsPreview extends  React.Component{


    render() {
        return(
            <div>
                <h2>SVG elementy</h2>
                <strong>Elementy lze přetáhnout myší na pracovní plochu</strong>
                <Row>
                    {_.map(ElementService.getElementsPreviewComponent(), Element =>
                        <Col xs={3} key={UuidGenerator.generate()}>

                            <Element width={50} height={50}/>
                        </Col>
                    )}

                </Row>
            </div>
        )


    }

}
