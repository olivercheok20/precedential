import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import { Grid, Segment, Modal, Button, Header, Icon } from "semantic-ui-react";
import NavigationMenu from "./common/NavigationMenu";
import Home from "./home/Home";
import Research from "./research/Research";
import Database from "./database/Database";
import Resources from "./resources/Resources";
import Footer from "./common/Footer";


import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      home: true,
      research: false,
      database: false,
      resources: false,
      modalOpen: true
    };
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  goToHome() {
    this.setState({
      home: true,
      research: false,
      database: false,
      resources: false
    })
  }

  goToResearch() {
    this.setState({
      home: false,
      research: true,
      database: false,
      resources: false
    })
  }

  goToDatabase() {
    this.setState({
      home: false,
      research: false,
      database: true,
      resources: false
    })
  }

  goToResources() {
    this.setState({
      home: false,
      research: false,
      database: false,
      resources: true
    })
  }

  handleCloseModal() {
    this.setState({ 
      modalOpen: false 
    })
  }

  render() {
    return (
      <div className="App">
        <Modal
          id="disclaimer"
          defaultOpen
          open={this.state.modalOpen}
          >
          <Modal.Header as="h1">Terms and Conditions ("Terms")</Modal.Header>
          <Modal.Content scrolling>
            <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using Precedential.com operated by USPenguins ("us", "we", or "our").</p>
            <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
            <p><strong>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</strong></p>

            <Modal.Description>
              <Header>Content</Header>
              <p>
              Our Service allows you to access information that has already been made publicly available. It should not be misused other than for purposes of legal research and informational purposes only. 
              All documents and files provided on our site, Precedential.com, are provided without any warranty, express or implied, including as to their legal effect and completeness. 
              The information should be used as a guide and modified to meet your own individual needs and the laws of Singapore. Your use of any information or forms is at your own risk. 
              Precedential.com and any of its employees, contractors, or attorneys who participated in providing the information expressly disclaim any warranty: they are not creating or entering into any 
              Attorney-Client relationship by providing information to you.
              </p>
              <p>
              Communications between you and Precendential.com and any data you voluntarily offer in the usage of the site is only protected by our Privacy Policy, but NOT protected by the attorney-client privilege since 
              USPenguins is not a law firm and is not providing legal advice. No employee of TermsFeed, contractor, or attorney is authorized to provide you with any advice about what information (including agreements, 
              forms and documents) to use or how to use or how to complete them.
              </p>
            </Modal.Description>
            <br></br>
            <Modal.Description>
              <Header>Links to Other Web Sites</Header>
              <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by USPenguins.
              This website is not meant to contain legal advice. USPenguins has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. 
              You further acknowledge and agree that USPenguins shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance 
              on any such content, goods or services available on or through any such web sites or services.
              </p>
            </Modal.Description>
            <br></br>
            <Modal.Description>
              <Header>Changes</Header>
              <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. 
              What constitutes a material change will be determined at our sole discretion.
              </p>
            </Modal.Description>
            <br></br>
            <Modal.Description>
              <Header>Contact Us</Header>
              <p>
              If you have any questions about these Terms, please contact us.
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleCloseModal}>
              <Icon name='checkmark' /> I understand
            </Button>
          </Modal.Actions>
        </Modal>
        <Segment inverted vertical textAlign="center">
          <Grid style={{ height: "100%" }}>
            <Grid.Row width={16} style={{ height: "10vh" }}>
              <NavigationMenu
                appState={this.state}
                goToHome={this.goToHome.bind(this)}
                goToResearch={this.goToResearch.bind(this)}
                goToDatabase={this.goToDatabase.bind(this)}
                goToResources={this.goToResources.bind(this)}
              />
            </Grid.Row>
            <Grid.Row width={16} style={{ height: "auto" }}>
              {this.state.home && <Home goToResearch={this.goToResearch.bind(this)} />}
              {this.state.research && <Research />}
              {this.state.database && <Database />}
              {this.state.resources && <Resources />}
            </Grid.Row>
          </Grid>
          <Footer />
        </Segment>
      </div>
    );
  }
}

export default App;
