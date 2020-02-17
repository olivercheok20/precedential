import React, { Component } from "react";
import { Form, Select, Input } from "semantic-ui-react";
import ResearchModal from './ResearchModal';
import firebase from './firestore';

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
        key: 'manufacture',
        text: 'Manufacture of controlled drugs',
        value: 'Manufacture of controlled drugs',
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
        key: 'Monoacetyl Morphine',
        text: 'Monoacetyl Morphine',
        value: 'Monoacetyl Morphine'
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
        key: 'Monoacetylmorphine',
        text: 'Monoacetylmorphine',
        value: 'Monoacetylmorphine'
    },
]

const keywordOptions = [
    {
        key: 'spiked drink',
        text: 'Spiked Drink',
        value: 'Spiked Drink',
    },
    {
        key: 'first offender',
        text: 'First Offender',
        value: 'First Offender',
    },
    {
        key: 'family circumstances',
        text: 'Family Circumstances',
        value: 'Family Circumstances',
    },
    {
        key: 'remorse',
        text: 'Remorse',
        value: 'Remorse',
    },
    {
        key: 'certificate of substantive assistance',
        text: 'Certificate of Substantive Assistance',
        value: 'Certificate of Substantive Assistance',
    },
    {
        key: 'mental condition',
        text: 'Mental Condition',
        value: 'Mental Condition',
    }
]

class ResearchForm extends Component {
    state = {}

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            charge: '',
            type: '',
            quantity: null,
            keywords: [],
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
    handleSubmit = event => {
        if (this.state.charge || this.state.quantity || this.state.type || (this.state.keywords.length > 0)) {
            console.log("Submitting form");
            event.preventDefault();
            const db = firebase.firestore();
            db.collection('research').add(this.state);
            this.setState({
                modalOpen: true
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
                        label='Quantity of Drug'
                        placeholder='Quantity of Drug'
                        name='quantity'
                        value={quantity}
                        type='decimal'
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
                        handleModalClose={this.handleModalClose.bind(this)} />
                </Form>
            </div>
        )
    }
}

export default ResearchForm;
