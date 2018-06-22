import React from 'react';

import CheckboxGroup from './components/Checkbox'
import MultipleButton from './components/MultipleButton'
import FormRadioGroup from './components/RadioGroup'
import FormSelect from './components/Select'
import FormStepper from './components/Stepper'
import TextField from './components/TextField'
import FormDialog from './components/Dialogs'

import { Button, FormGroup } from '@material-ui/core'

// import sampleData from './sampleData'
import sampleData from './singleFormData'

import FileInput from './components/FileInput/'

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
			isDialogOpen: false,
		};
	}

	validateForm = (fieldname, value) => {
		var hasError = true;
		sampleData.registerFields.forEach(field => {
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
        let isValid = true
        if(sampleData.length > 1) {
            this.state.formsErrorFlag.forEach(flag => {
                if(flag) {
                    isValid = false
                }
            })
        } else {
            isValid = this.validateCurrentForm(this.state.currentCount);
        }
        if (isValid) this.onSubmit(this.state.userData.length > 0 ? this.state.userData : this.state.data);
		else {
			if(this.state.sampleData.length > 1) {
            	this.setState({
					isDialogOpen: true,
					currentCount: this.state.currentCount - 1,
					data: this.state.userData[this.state.currentCount -1],
				})
			} else {
				this.setState({
					isDialogOpen: true,
				})
			}
        }
	};

    onSubmit = (data) => {
		console.log(data)
		if(!data.length) {
			const keys = Object.keys(data)
			let formData = []
			keys.forEach(key => {
				console.log(key)
				const formKey = key.split('-')[0]
				formData[formKey] = data[key]
			})
			console.log(formData)
			this.props.onSubmit(formData)
		} else {
			const completeFormData = data.map(form => {
				const keys = Object.keys(form)
				let formData = []
				keys.forEach(key => {
					console.log(key)
					const formKey = key.split('-')[0]
					formData[formKey] = form[key]
				})
				return formData
			})
			this.props.onSubmit(completeFormData)
			console.log(completeFormData)
		}
	}

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

	handleMultiBack = () => {
        const {currentCount} = this.state
        this.validateCurrentForm(currentCount)
        let userData = this.state.userData
        userData[currentCount] = this.state.data
        this.setState({
            currentCount: currentCount - 1,
            userData: userData,
            data: userData[currentCount - 1],
		})
	}

	handleMultiNext = () => {
        const {currentCount} = this.state
		this.validateCurrentForm(currentCount)
		let userData = this.state.userData
		userData[currentCount] = this.state.data
		this.setState({
			currentCount: currentCount + 1,
            userData: userData,
            data: userData[currentCount + 1]
        },
        () => {
            if(this.state.currentCount === sampleData.length) {
                this.handleSubmit()
            }
        })
    }

	validateRegex = (pattern, value) => {
		const patt = new RegExp(pattern)
		const result = patt.test(value)
		return result
	}

	validateCurrentForm = (currentForm) => {
		const formData = this.state.sampleData[currentForm]
		let isValid = true
		let errors = this.state.errorStates
		formData.registerFields.forEach(field => {
            const {data} = this.state
            const name = `${field.name}-${currentForm}`
			if (field.isRequired) {
				const flag = data ? ((data[name] === '' || !data[name]) ? false : true) : false;
				if (!flag) {
					isValid = false;
					errors = {
						...errors,
						[name]: 'Input is Required'
					}
				}
			}
			if (field.pattern) {
				const flag = data ? this.validateRegex(field.pattern, data[name]) : false;
				if (!flag)
					isValid = false;
			}
		});

		if (isValid) {
			let formsErrorFlag = this.state.formsErrorFlag
			formsErrorFlag[currentForm] = false
			this.setState({formsErrorFlag});
		} else {
			let formsErrorFlag = this.state.formsErrorFlag
			formsErrorFlag[currentForm] = true
			this.setState({
				formsErrorFlag,
				errorStates: errors,
			});
		}
		return isValid
	}

	render() {

		return (
			<div>
				{sampleData.length > this.state.currentCount && (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '10px', overflow: 'hidden' }}>
					{sampleData.length > 1 && (<FormStepper formData={sampleData} key="multiFormStepper" currentStep={this.state.currentCount} isError={this.state.formsErrorFlag} />)}
					<FormGroup style={{ padding: '5px', width: '100%', position: 'relative', marginBottom: '50px' }}>
						{sampleData.length === 1 && (<div style={{backgroundColor: '#e7e7e7', padding:15, color: '#333', marginLeft: -10, paddingLeft: 5, fontSize: 20}} className="formHeading">{sampleData[this.state.currentCount].label}</div>)}
						{sampleData[this.state.currentCount].registerFields && sampleData[this.state.currentCount].registerFields.map(field => {
							const key = `${field.name}-${this.state.currentCount}`
							switch(field.type) {
                                case 'string': return <TextField autoFocus={this.state.errorStates[key]} name={key} key={key} data={this.state.data} fieldData={field} errorStates={this.state.errorStates} onBlur={this.onTextBlur} />
                                case 'number': return <TextField autoFocus={this.state.errorStates[key]} name={key} key={key} data={this.state.data} fieldData={field} errorStates={this.state.errorStates} onBlur={this.onTextBlur} />
                                case 'password': return <TextField autoFocus={this.state.errorStates[key]} name={key} key={key} data={this.state.data} fieldData={field} errorStates={this.state.errorStates} onBlur={this.onTextBlur} />
                                case 'radioGroup': return <FormRadioGroup autoFocus={this.state.errorStates[key]} name={key} key={key} data={this.state.data} fieldData={field} errorStates={this.state.errorStates} onChange={this.onRadioChange} />;
                                case 'checkboxGroup': return <CheckboxGroup autoFocus={this.state.errorStates[key]} name={key} key={key} data={this.state.data} fieldData={field} errorStates={this.state.errorStates} onClick={this.onCheckboxGroupClick} />;
                                case 'select': return <FormSelect autoFocus={this.state.errorStates[key]} name={key} key={key} data={this.state.data}  fieldData={field} errorStates={this.state.errorStates} onClick={this.onSelectClick} />;
                                case 'file': return <FileInput autoFocus={this.state.errorStates[key]} name={key} key={key} data={this.state.data} fieldData={field} errorStates={this.state.errorStates} onChange={this.onFileUpload} />;
                                default: return null
                            }
						})}
					</FormGroup>
				</div>)}
				<div style={{position: 'fixed', bottom: '0', width: '100%'}}>
					{sampleData.length === 1 && (<Button variant="raised" color="primary" onClick={this.handleSubmit} fullWidth>
						Submit
					</Button>)}
					{sampleData.length>1 &&(<MultipleButton formLength={sampleData.length} handleBack={this.handleMultiBack} handleNext={this.handleMultiNext}/>)}
					<FormDialog isOpen={this.state.isDialogOpen} contentText="Please fill the Forms Correctly" contentTitle="Error" buttonText="Okay" />
					{!sampleData[0].registerFields && <div>Could not load Form from the server!!</div>}
				</div>
			</div>
		)
	}
}

export default App