import React, { Component } from "react";
import download from 'downloadjs';

import { Button, Container, Divider, Header, Icon } from "semantic-ui-react";

import DatabaseDescription from "./DatabaseDescription.jsx";

class Home extends Component {

    downloadDatabase = async () => {
        console.log("Downloading database...");
        const res = await fetch('/database');
        const blob = await res.blob();
        download(blob, 'database.xlsx');
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
                <Button primary size="huge" onClick={this.downloadDatabase}>Download Database</Button>
            </Container>
        )
    }
}

export default Home;