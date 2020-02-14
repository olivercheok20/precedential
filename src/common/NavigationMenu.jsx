import React, { Component } from "react";

import { Container, Header, Menu, Icon } from "semantic-ui-react";

class NavigationMenu extends Component {
    render() {
        return (
            <Container as="nav" text>
                <Header inverted as="h1"
                    onClick={this.props.goToHome}>
                    Precedential
                </Header>
                <Menu borderless compact inverted icon="labeled">
                    <Menu.Item
                        active={this.props.appState.home}
                        onClick={this.props.goToHome}>
                        <Icon name="home" />
                        Home
                    </Menu.Item>
                    <Menu.Item
                        active={this.props.appState.research}
                        onClick={this.props.goToResearch}>
                        <Icon name="balance scale" />
                        Research
                    </Menu.Item>
                    <Menu.Item
                        active={this.props.appState.database}
                        onClick={this.props.goToDatabase}>
                        <Icon name="database" />
                        Database
                    </Menu.Item>
                    <Menu.Item
                        active={this.props.appState.resources}
                        onClick={this.props.goToResources}>
                        <Icon name="book" />
                        Resources
                    </Menu.Item>
                </Menu>
            </Container>
        )
    }
}

export default NavigationMenu;