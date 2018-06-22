import React from 'react'
import { FormControlLabel, TextField as TextInput, FormHelperText} from '@material-ui/core'

export default class TextField extends React.PureComponent {
    constructor(props) {
        super(props)
        const {name} = props
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
        const { label, type, placeholder, isRequired, pattern, errorText } = this.props.fieldData
        const { errorStates, name } = this.props
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