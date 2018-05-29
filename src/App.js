import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextInput from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import sampleData from './sampleData'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			isValid: false,
			errorStates: {},
		};
	}

	validateRegex = (pattern, value) => {
		const patt = new RegExp(pattern);
		const result = patt.test(value);
		return result;
	};

	validateField = (fieldName, value, pattern, errorText) => {
		let isValid = true;
		if (pattern) {
			isValid = this.validateRegex(pattern, value);
      this.setState({
        errorStates: {
				  ...this.state.errorStates,
				  [fieldName]: isValid ? false : errorText,
        }    
      });
    }
	};

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

	onChange = (e, fieldName, fieldPattern, errorText) => {
		let value = e.target.value;
		this.setState(
			{
				data: {
					...this.state.data,
					[fieldName]: value,
				},
			},
			() => this.validateField(fieldName, value, fieldPattern, errorText)
		);
	};

	render() {
		return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				{sampleData.registerFields && sampleData.registerFields.map(field => (
						<FormGroup key={field.name} style={{ padding: '5px', width: '100%', marginLeft: '50px', position: 'relative' }}>
							<FormControlLabel
								control={
									<TextInput
                    style={{width: '100%'}}
										name={field.name}
										key={field.name}
										label={field.label}
										type={field.type}
										placeholder={field.placeholder}
										required={field.isRequired}
										error={this.state.errorStates[field.name] ? true : false}
										onChange={e =>
											this.onChange(e, field.name, field.pattern, field.errorText)
										}
									/>
								}
							/>
							{this.state.errorStates[field.name] && (
								<FormHelperText style={{ color: 'red', position: 'absolute', left: '-10px', bottom: '-10px' }}>
									{this.state.errorStates[field.name]}
								</FormHelperText>
							)}
						</FormGroup>
					))}
				<Button style={{ position: 'fixed', bottom: '0' }} disabled={!this.state.isValid} variant="raised" color="primary" onClick={this.handleSubmit} fullWidth>
					Submit
				</Button>
				{!sampleData.registerFields && <div>Could not load Form from the server!!</div>}
			</div>;
	}
}

export default App