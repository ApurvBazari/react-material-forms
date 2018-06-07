import React from 'react';
import PropTypes from 'prop-types';

import {
        Button,
        TextField as TextInput,
        Radio,
        RadioGroup,
        Checkbox,
        Input,
        InputLabel,
        MenuItem,
        ListItemText,
        Select,
        Chip,
        Stepper,
        Step,
        StepLabel,
        StepConnector,
        Typography,
        FormLabel,
        FormControl,
        FormGroup,
        FormControlLabel,
        FormHelperText,
        MobileStepper,
    } from '@material-ui/core'

import sampleData from './sampleData'

import FileInput from './components/FileInput/'
import CheckboxGroup from './components/CheckboxGroup/'
export class TextField extends React.PureComponent {
    constructor(props) {
        super(props)
        const { name } = props.fieldData
        this.state = {
            inputValue: props.data ? props.data[name] : ''
        }
    }

    validateRegex = (pattern, value) => {
        const patt = new RegExp(pattern);
        const result = patt.test(value)
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
        this.setState({
            inputValue: value
        })
    }

    onBlur = (e, name, pattern, errorText) => {
        console.log('Now validate')
        const value = e.target.value
        const isValid = this.validateField(name, value, pattern, errorText)
        isValid ? this.props.onBlur(null, value, name) : this.props.onBlur(errorText, value, name)
    }

    render() {
        const { name, label, type, placeholder, isRequired, pattern, errorText } = this.props.fieldData
        const {data, errorStates} = this.props
        return (
        <div style={{ padding: '10px', width: '100%', position: 'relative'}}>
            <FormControlLabel
                style={{width: '100%'}}
                control={
                    <TextInput
                        value={this.state.inputValue}
                        fullWidth
                        name={name}
                        label={label}
                        type={type}
                        placeholder={placeholder}
                        required={isRequired}
                        error={errorStates[name] ? true : false}
                        onBlur={e => this.onBlur(e, name, pattern, errorText)}
                        onChange={e => this.onChange(e, name, pattern, errorText)}
                    />
				}
			/>
			<FormHelperText style={{ color: 'red'}}>
				{errorStates[name]}
			</FormHelperText>
		</div>
		)
	}
}

export class FormRadioGroup extends React.PureComponent {
	constructor(props) {
        super(props)
        const {data, fieldData} = this.props
        const initialvalue = data ? data[fieldData.name] : null
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
    const { fieldData, errorStates } = this.props;
	const {name} = fieldData
    
    return (
	 <div className="root" style={{ marginTop: '20px', paddingTop: '20px', width: '100%', position: 'relative'}}>
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


export class FormSelect extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
            initialValue: props.data || [],
            value: [],
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
		const {
		    payload,
		    name,
		    isMultiple
		} = fieldData
        const {initialValue} = this.state
		return (
			<div>
				<FormControl component="fieldset" fullWidth>
					<InputLabel htmlFor = "select-multiple">{fieldData.label}</InputLabel>
					<Select
						multiple = {isMultiple ? true : false}
						value={!!initialValue[name] ? initialValue[name] : this.state.value}
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

export class FormStepper extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			currentStep: 0,
		}
	}

	render() {
		const {formData, currentStep, isError, isComplete} = this.props

		return (
			<Stepper style={{width: '100%', marginRight: '10px'}} activeStep={currentStep} alternativeLabel nonLinear>
				{formData.map((form, i) => {
					let error = ''
					if(isError[i] === false) {
						error = false
					} else if(isError[i] === true){
						error = true
					}
					return (
						<Step key={form.name} completed={error.toString() === 'false' ? true : (error.toString() === 'true' ? false : null)}>
							<StepLabel key={form.name} error={isError[i]} alternativeLabel>{form.label}</StepLabel>
						</Step>
					)
				})}
			</Stepper>
		)
	}
}

export class MultipleButton extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			activeStep: 0,
		}
	}

	handleBack = () => {
		this.props.handleBack(this.state.activeStep)
		this.setState({
			activeStep: this.state.activeStep - 1,
		});
	};

	handleNext = () => {
		this.props.handleNext(this.state.activeStep)
		this.setState({
			activeStep: this.state.activeStep + 1,
		});
	};

	render() {
		const { formLength } = this.props

		return (
			<MobileStepper
				variant="dots"
				steps={formLength}
				position="sticky"
				activeStep={this.state.activeStep}
				className="root"
				style={{background: '#e7e7e7'}}
				nextButton={
					<Button style={{background: '#e7e7e7'}} size="small" onClick={this.handleNext} disabled={this.state.activeStep === formLength}>
						Next
						<p><i class="arrow right" /></p>
					</Button>
				}
				backButton= {
					<Button style={{background: '#e7e7e7'}}size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0} >
						Back
						<p><i class="arrow left" /></p>
					</Button>
				}
			/>
		)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: [],
			currentCount: 0,
			data: {},
			isValid: false,
			errorStates: {},
			formsErrorFlag: [],
			sampleData: sampleData,
		};
	}

	validateForm = (fieldname, value) => {
		var hasError = true;
		const errorForms = sampleData.registerFields.map(field => {
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
		// const currentData = this.state.data[name] ? this.state.data[name] : []
        //let currentData = this.state.data[name] ? this.state.data[name] : []
        //currentData.indexOf(value) > -1 ? currentData.splice(currentData.indexOf(value), 1) : currentData.push(value)
        // currentData.push(value)
		this.setState({
			data:{
				...this.state.data,
				[name]: value
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

	onFileUpload = (name, blob) => {
		console.log('Now setState and show preview option')
		this.setState({
			data: {
				...this.state.data,
				[name]: blob
			}
		})
	}

	handleMultiBack = (activeStep) => {
		this.setState({
			currentCount: activeStep - 1,
		})
	}

	handleMultiNext = (activeStep) => {
		this.validateCurrentForm(activeStep)
		let userData = this.state.userData
		userData[activeStep] = this.state.data
		this.setState({
			currentCount: activeStep + 1,
			userData: userData,
		})
	}

	validateRegex = (pattern, value) => {
		const patt = new RegExp(pattern)
		const result = patt.test(value)
		return result
	}

	validateCurrentForm = (currentForm) => {
		const formData = this.state.sampleData[currentForm]
		const userData = this.state.data
		var isValid = true;
		formData.registerFields.map(field => {
			if (field.isRequired) {
				const flag = this.state.data[field.name] ? (this.state.data[field.name] === '' ? false : true) : false;
				if (!flag) isValid = false;
			}
			if (field.pattern) {
				const flag = this.validateRegex(field.pattern, this.state.data[field.name]);
				if (!flag) isValid = false;
			}
		});
		if (isValid) {
			let formsErrorFlag = this.state.formsErrorFlag
			formsErrorFlag[currentForm] = false
			this.setState({formsErrorFlag});
		} else {
			let formsErrorFlag = this.state.formsErrorFlag
			formsErrorFlag[currentForm] = true
			this.setState({formsErrorFlag});
		}
	}

	render() {

		return (
			<div>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '10px', overflow: 'hidden' }}>
					{sampleData.length > 0 && (<FormStepper formData={sampleData} key="multiFormStepper" currentStep={this.state.currentCount} isError={this.state.formsErrorFlag} />)}
					<FormGroup style={{ padding: '5px', width: '100%', position: 'relative', marginBottom: '50px' }}>
						{sampleData.length === 0 && (<div style={{marginTop: '10px'}} className="formHeading">{sampleData[this.state.currentCount].label}</div>)}
						{sampleData[this.state.currentCount].registerFields && sampleData[this.state.currentCount].registerFields.map(field => {
							const key = `${field.name}-${this.state.currentCount}`
							switch(field.type) {
                                case 'string': return <TextField key={key} data={this.state.userData[this.state.currentCount]} fieldData={field} errorStates={this.state.errorStates} onBlur={this.onTextBlur} />
                                case 'number': return <TextField key={key} data={this.state.userData[this.state.currentCount]} fieldData={field} errorStates={this.state.errorStates} onBlur={this.onTextBlur} />
                                case 'password': return <TextField key={key} data={this.state.userData[this.state.currentCount]} fieldData={field} errorStates={this.state.errorStates} onBlur={this.onTextBlur} />
                                case 'radioGroup': return <FormRadioGroup key={key} data={this.state.userData[this.state.currentCount]} fieldData={field} errorStates={this.state.errorStates} onChange={this.onRadioChange} />;
                                case 'checkboxGroup': return <CheckboxGroup key={key} data={this.state.userData[this.state.currentCount]} fieldData={field} errorStates={this.state.errorStates} onClick={this.onCheckboxGroupClick} />;
                                case 'select': return <FormSelect key={key} data={this.state.userData[this.state.currentCount]}  fieldData={field} errorStates={this.state.errorStates} onClick={this.onSelectClick} />;
                                case 'file': return <FileInput key={key} data={this.state.userData[this.state.currentCount]} fieldData={field} errorStates={this.state.errorStates} onChange={this.onFileUpload} />;
							}
						})}
					</FormGroup>
				</div>
				<div style={{position: 'fixed', bottom: '0', width: '100%'}}>
					{sampleData.length === 1 && (<Button disabled={!this.state.isValid} variant="raised" color="primary" onClick={this.handleSubmit} fullWidth>
						Submit
					</Button>)}
					{sampleData.length>1 &&(<MultipleButton formLength={sampleData.length} handleBack={this.handleMultiBack} handleNext={this.handleMultiNext}/>)}
					{!sampleData[0].registerFields && <div>Could not load Form from the server!!</div>}
				</div>
			</div>
		)
	}
}

export default App