import React from 'react'
import { FormControl, InputLabel, Select, Input, MenuItem, FormHelperText } from '@material-ui/core'

export default class FormSelect extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
            initialValue: props.data || [],
            value: [],
		}
	}

	handleChange = name => e => {
        let value = e.target.value
		this.setState({value})
		this.props.onClick(name, value)
	}

	render() {
		const {fieldData, name, errorStates} = this.props
		const { payload, isMultiple } = fieldData
        const {initialValue} = this.state
		
		return (
			<div>
				<FormControl component="fieldset" fullWidth>
					<InputLabel error={errorStates[name] ? true : false} htmlFor = "select-multiple">{fieldData.label}</InputLabel>
					<Select
						multiple = {isMultiple ? true : false}
						value = {!!initialValue[name] ? (this.state.value.length > 0 ? this.state.value : initialValue[name]) : this.state.value
						}
						onChange={this.handleChange(name)}
						input={<Input id="select-multiple" />}
					>
					{payload.map(value => (
						<MenuItem key={value} value={value}>
							{value}
						</MenuItem>
					))}
					</Select>
					{errorStates[name] && (<FormHelperText style={{ color: 'red'}}>
						{errorStates[name]}
					</FormHelperText>)}
				</FormControl>
			</div>
		)
	}
}