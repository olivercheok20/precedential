import React, { Component } from "react";
import download from 'downloadjs';

import { Button, Container, Divider, Header, Icon } from "semantic-ui-react";

import ResourcesText from "./ResourcesText.jsx";

class Resources extends Component {

    downloadResources = async () => {
        console.log("Downloading resources...");
        const res = await fetch('/resources');
        const blob = await res.blob();
        download(blob, 'resources.pdf');
    }

    render() {
        return (
            <Container className="content">
            <Icon name="book" size="massive"/>
                <Header inverted as="h1">
                    Resources
                </Header>
                <Divider inverted/>
                <ResourcesText />
                <Button primary size="huge" onClick={this.downloadResources}>Download Resources</Button>
            </Container>
        )
    }
}

export default Resources;