import React, { Component } from "react";
import { Form, Select, Input } from "semantic-ui-react";
import ResearchModal from './ResearchModal';

const chargeOptions = [
    {
        key: 'trafficking',
        text: 'Trafficking in controlled drugs',
        value: 'Trafficking in controlled drugs',
    },
    {
        key: 'consumption',
        text: 'Consumption of controlled drugs',
        value: 'Consumption of controlled drugs',
    },
    {
        key: 'possession',
        text: 'Possession of controlled drugs',
        value: 'Possession of controlled drugs',
    },
    {
        key: 'import/export',
        text: 'Import and export of controlled drugs',
        value: 'Import and export of controlled drugs',
    },
    {
        key: 'arranging or planning gatherings where controlled drugs are to be consumed or trafficked',
        text: 'Arranging or planning gatherings where controlled drugs are to be consumed or trafficked',
        value: 'Arranging or planning gatherings where controlled drugs are to be consumed or trafficked',
    },
    {
        key: 'utensils',
        text: 'Possession of pipes, utensils, etc.',
        value: 'Possession of pipes, utensils, etc.',
    }
]

const drugOptions = [
    {
        key: 'Cannabis',
        text: 'Cannabis',
        value: 'Cannabis'
    },
    {
        key: 'Diamorphine',
        text: 'Diamorphine',
        value: 'Diamorphine'
    },
    {
        key: 'Methamphetamine',
        text: 'Methamphetamine',
        value: 'Methamphetamine'
    },
    {
        key: 'Monoacetylmorphine',
        text: 'Monoacetylmorphine',
        value: 'Monoacetylmorphine'
    },
    {
        key: 'Ketamine',
        text: 'Ketamine',
        value: 'Ketamine'
    },
    {
        key: 'Opium',
        text: 'Opium',
        value: 'Opium'
    },
    {
        key: 'Nimetazepam',
        text: 'Nimetazepam',
        value: 'Nimetazepam'
    },
    {
        key: 'Phenethylamine',
        text: 'Phenethylamine',
        value: 'Phenethylamine'
    },
    {
        key: 'Cannabis mixture',
        text: 'Cannabis mixture',
        value: 'Cannabis mixture'
    },
    {
        key: 'Synthetic cannabinoid',
        text: 'Synthetic cannabinoid',
        value: 'Synthetic cannabinoid'
    },
    {
        key: 'Cannabinol',
        text: 'Cannabinol',
        value: 'Cannabinol'
    },
    {
        key: '25B-NBOMe',
        text: '25B-NBOMe',
        value: '25B-NBOMe'
    },
    {
        key: 'MDMA',
        text: 'MDMA',
        value: 'MDMA'
    }
]

const keywordOptions = [
    {
        key: 'family circumstances',
        text: 'Family Circumstances',
        value: 'family circumstances',
    },
    {
        key: 'mental condition',
        text: 'Mental Condition',
        value: 'mental condition',
    },
    {
        key: 'certificate of substantive assistance',
        text: 'Certificate of Substantive Assistance',
        value: 'certificate of substantive assistance',
    },
    {
        key: 'insufficient evidence',
        text: 'Insufficient Evidence',
        value: 'insufficient evidence',
    },
    {
        key: 'spiked drink',
        text: 'Spiked Drink',
        value: 'spiked drink',
    },
    {
        key: 'cooperative',
        text: 'Cooperative',
        value: 'cooperative',
    },
    {
        key: 'remand',
        text: 'Remand',
        value: 'remand',
    },
    {
        key: 'first offender',
        text: 'First Offender',
        value: 'first offender',
    },
    {
        key: 'knowledge',
        text: 'Knowledge',
        value: 'knowledge',
    },
    {
        key: 'no wilful blindness',
        text: 'No Wilful Blindness',
        value: 'no wilful blindness',
    },
    {
        key: 'remorse',
        text: 'Remorse',
        value: 'remorse',
    },
    {
        key: 'statutory presumption',
        text: 'Statutory Presumption',
        value: 'statutory presumption',
    },
    {
        key: 'not mastermind',
        text: 'Not Mastermind',
        value: 'not mastermind',
    },
    {
        key: 'one-off transaction',
        text: 'One-off Transaction',
        value: 'one-off transaction',
    },
    {
        key: 'courier',
        text: 'Courier',
        value: 'courier',
    },
    {
        key: 'clean record',
        text: 'Clean Record',
        value: 'clean record',
    },
    {
        key: 'good character',
        text: 'Good Character',
        value: 'good character',
    },
    {
        key: 'pleaded guilty',
        text: 'Pleaded Guilty',
        value: 'pleaded guilty',
    },
    {
        key: 'wilful blindness',
        text: 'Wilful Blindness',
        value: 'wilful blindness',
    }
]

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
