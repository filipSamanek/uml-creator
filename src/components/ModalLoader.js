import React from 'react';

export default class ModalLoader extends React.Component {

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
