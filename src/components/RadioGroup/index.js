import React from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, FormHelperText, Radio} from '@material-ui/core'

export default class FormRadioGroup extends React.PureComponent {
	constructor(props) {
        super(props)
        const { data, name } = this.props
        const initialvalue = data ? data[name] : null
		this.state = {
			value: initialvalue || null,
		};
	}

	handleChange = (event, name) => {
		const value = event.target.value
		this.setState({value});
		this.props.onChange(name, value)
	};

	render() {
    const { fieldData, errorStates, name } = this.props

    return (
	<div className="root" style={{ marginTop: '20px', paddingTop: '20px', width: '100%', position: 'relative'}}>
		<FormControl component="fieldset" required={fieldData.required} className="formControl">
			<FormLabel error={errorStates[name] ? true : false} component="legend">{fieldData.label}</FormLabel>
			<RadioGroup className="group" aria-label={fieldData.label} name={name} value={this.state.value} onChange={e => this.handleChange(e, name)}>
				{fieldData.payload.map(field => {
					return <FormControlLabel
                                key={field.name}
								value={field.name}
								disabled={field.disabled}
								control={<Radio color="primary" />}
								label={field.label}
							/>
				})}
			</RadioGroup>
		</FormControl>
		{errorStates[name] && (
			<FormHelperText style={{ color: 'red' }}>
				{errorStates[name]}
			</FormHelperText>
		)}
	</div>
    );
	}
}