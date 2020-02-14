import React, { Component } from "react";

import { Button, Container, Header, Icon } from "semantic-ui-react";

import DatabaseDescription from "./DatabaseDescription.jsx";

class Home extends Component {

    downloadDatabase() {
        console.log("Downloading database")
    }

    render() {
        return (
            <Container className="content">
                <Icon name="database" size="massive"/>
                <Header inverted as="h1">
                    Database
                </Header>
                <DatabaseDescription />
                <Button size="huge" onClick={this.downloadDatabase}>Download</Button>
            </Container>
        )
    }
}

export default Home;