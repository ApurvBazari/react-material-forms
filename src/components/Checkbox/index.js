import React from 'react'
import { Switch, Checkbox, FormControlLabel, FormLabel, FormControl, FormHelperText } from '@material-ui/core'

const componentsMap = {
	checkbox: Checkbox,
	switch: Switch,
}

export default class CheckboxGroup extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			data: props.data || []
		}
	}

	handleChange = name => event => {
		const value = event.target.name
        let currentData = this.state.data[name] ? this.state.data[name] : []
        currentData.indexOf(value) > -1 ? currentData.splice(currentData.indexOf(value), 1) : currentData.push(value)
        this.setState({
            data: {
                ...this.state.data,
                [name]: currentData,
            }
        },
    () => this.props.onClick(name, currentData))
	}

	render() {
		const {fieldData, errorStates, name} = this.props
		const {data} = this.state
		const FieldContainer = componentsMap[fieldData.fieldType]

		return (
			<div key={name} className="root" style={{ marginTop: '20px', paddingTop: '20px', width: '100%', position: 'relative'}}>
				<FormControl component="fieldset">
					<FormLabel component="legend">{fieldData.label}</FormLabel>
						{fieldData.payload.map(field => {
							return <FormControlLabel
                                key={field}
                                value={field}
                                name={field}
								control ={
									<FieldContainer
										checked={data[name] ? data[name].indexOf(field) > -1 : false}
										onChange={this.handleChange(name)}
                                    />
								}
								label={field}
							/>
						})}
					{errorStates[name] && (<FormHelperText>{errorStates[name]}</FormHelperText>)}
				</FormControl>
			</div>
		);
	}
}