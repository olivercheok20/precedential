import React, { Component } from "react";
import { Form, Select, Input } from "semantic-ui-react";
import ResearchModal from './ResearchModal';
import { chargeOptions, drugOptions, keywordOptions } from './Options';


class ResearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            charge: '',
            type: '',
            quantity: null,
            keywords: [],
            statutesViolated: '',
            prescribedSentence: '',
            rangeOfSentences: '',
            similarCases: '',
            sentencingEstimate: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handle an input change
    handleInputChange = key => (event) => {
        this.setState({
            [key]: event.target.value
        });
    }

    // handle change in dropdown menu
    handleDropdownChange = key => (event, { value }) => {
        this.setState({
            [key]: value,
        });
    }

    // handle pushing to firebase on submit
    handleSubmit = (event) => {
        if (this.state.charge ||
            (this.state.quantity && this.state.quantity > 0) ||
            this.state.type ||
            (this.state.keywords.length > 0)) {
            console.log("Submitting form");
            event.preventDefault();
            fetch('/research', {
                method: 'GET',
                headers: this.state
            }).then((res) => {
                const resJson = res.json();
                return resJson;
            }).then((resJson) => {
                console.log(resJson);
                this.setState({
                    modalOpen: true,
                    statutesViolated: resJson.statutesViolated,
                    prescribedSentence: resJson.prescribedSentence,
                    rangeOfSentences: resJson.rangeOfSentences,
                    similarCases: resJson.similarCases,
                    sentencingEstimate: resJson.sentencingEstimate
                })
            })
        }
    }

    // handle modal closing
    handleModalClose = () => {
        this.setState({
            modalOpen: false,
            charge: '',
            type: '',
            quantity: null,
            keywords: [],
        })
    }

    render() {
        const { charge, type, quantity, keywords } = this.state;

        return (
            <div>
                <h2>Input case details</h2>
                <Form onSubmit={this.handleSubmit} inverted>
                    <Form.Field
                        search
                        control={Select}
                        label='Charge'
                        options={chargeOptions}
                        placeholder='Charge'
                        name='charge'
                        value={charge}
                        onChange={this.handleDropdownChange('charge')}
                        fluid
                    />
                    <Form.Field
                        search
                        control={Select}
                        label={'Type of Drug'}
                        options={drugOptions}
                        placeholder='Type of Drug'
                        name='type'
                        value={type}
                        onChange={this.handleDropdownChange('type')}
                        fluid
                    />
                    <Form.Field
                        inline
                        control={Input}
                        label='Quantity of Drug (g)'
                        placeholder='Quantity of Drug'
                        name='quantity'
                        value={quantity || ''}
                        error={this.state.quantity < 0}
                        type='number'
                        onChange={this.handleInputChange('quantity')}
                        fluid
                    />
                    <Form.Field
                        search
                        control={Select}
                        label={'Keywords'}
                        options={keywordOptions}
                        placeholder='Keywords'
                        name='keywords'
                        value={keywords}
                        onChange={this.handleDropdownChange('keywords')}
                        multiple
                        fluid
                    />
                    <ResearchModal
                        modalOpen={this.state.modalOpen}
                        handleSubmit={this.handleSubmit.bind(this)}
                        handleModalClose={this.handleModalClose.bind(this)}
                        statutesViolated={this.state.statutesViolated}
                        prescribedSentence={this.state.prescribedSentence}
                        rangeOfSentences={this.state.rangeOfSentences}
                        similarCases={this.state.similarCases}
                        sentencingEstimate={this.state.sentencingEstimate}
                    />
                </Form>
            </div>
        )
    }
}

export default ResearchForm;
