import React, { Component } from "react";

import { Divider, Modal, Button } from "semantic-ui-react";

class ResearchModal extends Component {

    render() {
        return (
            <Modal
                open={this.props.modalOpen}
                onClose={this.props.handleModalClose}
                trigger={<Button primary onClick={this.props.handleSubmit}>
                    Submit
                        </Button>}>
                <Modal.Header as="h1">Results</Modal.Header>
                <Modal.Content>
                    <Modal.Header as="h4">Statutes Violated</Modal.Header>
                    <Divider />
                    <Modal.Header as="h4">Prescribed Sentence</Modal.Header>
                    <Divider />
                    <Modal.Header as="h4">Range of Sentences in Similar Cases</Modal.Header>
                    <Divider />
                    <Modal.Header as="h4">Similar Cases</Modal.Header>
                    <Divider />
                    <Modal.Header as="h4">Sentencing Estimate</Modal.Header>
                </Modal.Content>
            </Modal>
        )
    }
}

export default ResearchModal;