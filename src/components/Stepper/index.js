import React from 'react'
import { Stepper, Step, StepLabel} from '@material-ui/core'

export default class FormStepper extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			currentStep: 0,
		}
	}

	render() {
		const { formData, currentStep, isError } = this.props

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