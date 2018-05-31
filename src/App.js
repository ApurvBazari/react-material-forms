import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextInput from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';	
import Chip from '@material-ui/core/Chip';


import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import sampleData from './sampleData'

export class TextField extends React.PureComponent {
	validateRegex = (pattern, value) => {
		const patt = new RegExp(pattern);
		const result = patt.test(value);
		return result;
	};

	validateField = (fieldName, value, pattern, errorText) => {
		const isValid = this.validateRegex(pattern, value);
		if(!isValid) {
			return false
		}
		return true
	};

	onChange = (e, fieldName, fieldPattern, errorText) => {
		const value = e.target.value
		const isValid = this.validateField(fieldName, value, fieldPattern, errorText)
		if(isValid) {
			this.props.onBlur(null, value, fieldName)
		}
	}

	onBlur = (e, name, pattern, errorText) => {
		console.log('Now validate')
		const value = e.target.value
		const isValid = this.validateField(name, value, pattern, errorText)
		isValid ? this.props.onBlur(null, value, name) : this.props.onBlur(errorText, value, name)
	}

	render() {
		const { name, label, type, placeholder, isRequired, pattern, errorText } = this.props.fieldData
		const {errorStates} = this.props
		return (
			<div style={{ padding: '10px', width: '100%', position: 'relative'}}>
				<FormControlLabel
					style={{width: '100%'}}
					control={
						<TextInput
							style={{ width: '100%' }}
							name={name}
							label={label}
							type={type}
							placeholder={placeholder}
							required={isRequired}
							error={errorStates[name] ? true : false}
							onBlur={e =>
								this.onBlur(e, name, pattern, errorText)
							}
							onChange={e => this.onChange(e, name, pattern, errorText)}
						/>
					}
				/>
				{errorStates[name] && (
					<FormHelperText style={{ color: 'red'}}>
						{errorStates[name]}
					</FormHelperText>
				)}
			</div>
		)
	}
}

export class FormRadioGroup extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			value: this.props.initialvalue ? this.props.initialvalue : null,
		};
	}

	handleChange = (event, name) => {
		const value = event.target.value
		this.setState({value});
		this.props.onChange(name, value)
	};

	render() {
    const { fieldData, errorStates } = this.props;
	const {name} = fieldData
	
    return (
      <div className="root" style={{ paddingTop: '20px', width: '100%', position: 'relative'}}>
		<FormControl component="fieldset" required={fieldData.required} className="formControl">
			<FormLabel component="legend">{fieldData.label}</FormLabel>
			<RadioGroup className="group" aria-label={fieldData.label} name={fieldData.name} value={this.state.value} onChange={e => this.handleChange(e, fieldData.name)}>
				{fieldData.payload.map(field => {
					return <FormControlLabel
								value={field.name}
								disabled={field.disabled}
								control={<Radio color="primary" />}
								label={field.label}
							/>
				})}
			</RadioGroup>
		</FormControl>
		{errorStates[name] && (
			<FormHelperText style={{ color: 'red', position: 'absolute', left: '-10px', bottom: '-10px' }}>
				{errorStates[name]}
			</FormHelperText>
		)}
      </div>
    );
  }
}

export class CheckboxGroup extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}

	handleChange = name => event => {
		const value = event.target.value
		this.props.onClick(name, value)
	}

  	render() {
		const {fieldData, errorStates} = this.props
		const {name} = fieldData		
		return (
			<div className="root" style={{ paddingTop: '20px', width: '100%', position: 'relative'}}>
				<FormControl component="fieldset">
					<FormLabel component="legend">{fieldData.label}</FormLabel>
						{fieldData.payload.map(field => {
							return <FormControlLabel
								control ={
									<Checkbox
										checked={this.state.data[field]}
										onChange={this.handleChange(name)}
										value={field}
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

export class MultiSelect extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			value: []
		}
	}

	handleChange = name => e => {
		// console.log(e.target.value)
		const value = e.target.value
		this.setState({value})
		this.props.onClick(name, value)
	}

	render() {
		const {fieldData} = this.props
		const {payload} = fieldData

		return (
			<div>
				<FormControl component="fieldset" fullWidth>
					<InputLabel htmlFor = "select-multiple">{fieldData.label}</InputLabel>
					<Select
						multiple
						value={this.state.value}
						onChange={this.handleChange(fieldData.name)}
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
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			isValid: false,
			errorStates: {},
		};
	}

	validateForm = (fieldname, value) => {
		var hasError = true;
		sampleData.registerFields.map(field => {
			if (field.isRequired) {
				const flag = this.state.data[field.name] ? (this.state.data[field.name] === '' ? false : true) : false;
				if (!flag) hasError = false;
			}
			if (field.pattern) {
				const flag = this.validateRegex(field.pattern, this.state.data[field.name]);
				if (!flag) hasError = false;
			}
		});
		if (hasError) {
			this.setState({
				isValid: true,
			});
		} else {
			this.setState({
				isValid: false,
			});
		}
		return hasError;
	};

	handleSubmit = () => {
		const isValid = this.validate(this.state.data);
		if (isValid) this.props.onSubmit(this.state.data);
		else alert('Fill the Form Correctly');
	};

	onTextBlur = (errorText, fieldValue, fieldName) => {
		this.setState({
			errorStates: {
				...this.state.errorStates,
				[fieldName]: errorText ? errorText : null
			},
			data: {
				...this.state.data,
				[fieldName]: fieldValue
			}
		})
	}

	onRadioChange = (name, value) => {
		this.setState({
			data: {
				...this.state.data,
				[name]: value,
			}
		})
	}
	
	onCheckboxGroupClick = (name, value) => {
		const currentData = this.state.data[name] ? this.state.data[name] : []
		currentData.push(value)
		this.setState({
			data:{
				...this.state.data,
				[name]: currentData
			}
		})
	}

	onSelectClick = (name, value) => {
		this.setState({
			data: {
				...this.state.data,
				[name]: value
			}
		})
	}

	render() {
		return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', paddingLeft: '10px' }}>
				<FormGroup style={{ padding: '5px', width: '100%', position: 'relative' }}>
					<div style={{marginTop: '10px'}} className="formHeading">{sampleData.label}</div>
					{sampleData.registerFields && sampleData.registerFields.map(field => {
						switch(field.type) {
							case 'string': return <TextField key={field.name} fieldData={field} errorStates={this.state.errorStates} onBlur={this.onTextBlur} />
							case 'number': return <TextField key={field.name} fieldData={field} errorStates={this.state.errorStates} onBlur={this.onTextBlur} />
							case 'password': return <TextField key={field.name} fieldData={field} errorStates={this.state.errorStates} onBlur={this.onTextBlur} />
							case 'radioGroup': return <FormRadioGroup key={field.name} fieldData={field} errorStates={this.state.errorStates} onChange={this.onRadioChange}/>
							case 'checkboxGroup': return <CheckboxGroup key={field.name} fieldData={field} errorStates={this.state.errorStates} onClick={this.onCheckboxGroupClick} />
							case 'multipleSelect': return <MultiSelect key={field.name} fieldData={field} errorStates={this.state.errorStates} onClick={this.onSelectClick} />
						}
					})}
				</FormGroup>
				<Button style={{ position: 'fixed', bottom: '0' }} disabled={!this.state.isValid} variant="raised" color="primary" onClick={this.handleSubmit} fullWidth>
					Submit
				</Button>
				{!sampleData.registerFields && <div>Could not load Form from the server!!</div>}
			</div>;
	}
}

export default App