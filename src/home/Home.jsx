import React, { Component } from "react";

import { Button, Container, Divider, Header, Image } from "semantic-ui-react";

import HomeDescription from "./HomeDescription";

class Home extends Component {
    render() {
        return (
            <Container className="content">
                <Image src={require("../logo.png")} size="small" centered />
                <Header inverted as="h1">
                    Precedential
                </Header>
                <Divider inverted/>
                <HomeDescription />
                <Button size="huge" onClick={this.props.goToResearch}>Start Research</Button>
            </Container>
        )
    }
}

export default Home;