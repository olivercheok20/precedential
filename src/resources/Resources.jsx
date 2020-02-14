import React, { Component } from "react";

import { Button, Container, Header, Icon } from "semantic-ui-react";

import ResourcesText from "./ResourcesText.jsx";

class Resources extends Component {

    downloadResources() {
        console.log("Downloading resources");
    }
    render() {
        return (
            <Container className="content">
            <Icon name="book" size="massive"/>
                <Header inverted as="h1">
                    Resources
                </Header>
                <ResourcesText />
                <Button size="huge" onClick={this.downloadResources}>Download Resources</Button>
            </Container>
        )
    }
}

export default Resources;