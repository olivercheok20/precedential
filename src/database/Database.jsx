import React, { Component } from "react";

import { Button, Container, Divider, Header, Icon } from "semantic-ui-react";

import DatabaseDescription from "./DatabaseDescription.jsx";

class Home extends Component {

    downloadDatabase() {
        console.log("Downloading database");
    }

    render() {
        return (
            <Container className="content">
                <Icon name="database" size="massive"/>
                <Header inverted as="h1">
                    Database
                </Header>
                <Divider inverted/>
                <DatabaseDescription />
                <Button size="huge" onClick={this.downloadDatabase}>Download Database</Button>
            </Container>
        )
    }
}

export default Home;