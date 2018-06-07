import React from 'react'
import {
	Checkbox,
	FormControl,
	FormLabel,
	FormControlLabel,
	FormHelperText
} from '@material-ui/core'

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
    () => this.props.onClick(name, value))
	}

	render() {
		const {fieldData, errorStates} = this.props
        const {name} = fieldData
        const {data} = this.state
		return (
			<div className="root" style={{ marginTop: '20px', paddingTop: '20px', width: '100%', position: 'relative'}}>
				<FormControl component="fieldset">
					<FormLabel component="legend">{fieldData.label}</FormLabel>
						{fieldData.payload.map(field => {
							return <FormControlLabel
                                value={field}
                                name={field}
								control ={
									<Checkbox
										checked={data[name] ? data[name].indexOf(field) > -1 : false}
										onChange={this.handleChange(name)}
										// value={!!data ? data[name] : this.state.value}
                                        // value= {null}
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