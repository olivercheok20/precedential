import React, { Component } from "react";

import { Form, Select, Input } from "semantic-ui-react";

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

    render() {
        return (
            <div>
                <h2>Input case details</h2>
                <Form inverted>
                    <Form.Field
                        control={Select}
                        label='Charge'
                        options={chargeOptions}
                        placeholder='Charge'
                        fluid
                    />
                    <Form.Field
                        control={Select}
                        label={'Type of Drug'}
                        options={drugOptions}
                        placeholder='Type of Drug'
                        fluid
                    />
                    <Form.Field
                        inline
                        control={Input}
                        label='Quantity of Drug'
                        placeholder='Quantity of Drug'
                        type='decimal'
                        fluid
                    />
                    <Form.Field
                        control={Select}
                        label={'Keywords'}
                        options={keywordOptions}
                        placeholder='Keywords'
                        multiple
                        fluid
                    />
                    <Form.Button>Submit</Form.Button>
                </Form>
            </div>
        )
    }
}

export default ResearchForm;