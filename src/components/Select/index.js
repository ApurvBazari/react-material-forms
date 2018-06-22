import React from 'react'
import { FormControl, InputLabel, Select, Input, MenuItem} from '@material-ui/core'

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
		const {fieldData, name} = this.props
		const { payload, isMultiple } = fieldData
        const {initialValue} = this.state
		return (
			<div>
				<FormControl component="fieldset" fullWidth>
					<InputLabel htmlFor = "select-multiple">{fieldData.label}</InputLabel>
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
				</FormControl>
			</div>
		)
	}
}