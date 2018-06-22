import React from 'react'
import { MobileStepper, Button} from '@material-ui/core'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

export default class MultipleButton extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			activeStep: 0,
		}
	}

	handleBack = () => {
		this.setState({
			activeStep: this.state.activeStep - 1,
        });
        this.props.handleBack(this.state.activeStep)
	};

	handleNext = () => {
        const { formLength } = this.props
        if(this.state.activeStep + 1 < formLength) {
            this.setState({
                activeStep: this.state.activeStep + 1,
            });
        }
        this.props.handleNext()
	};

	render() {
		const { formLength } = this.props
        const { activeStep } = this.state

		return (
			<MobileStepper
				variant="dots"
				steps={formLength}
				activeStep={this.state.activeStep}
				className="root"
				style={{background: '#e7e7e7'}}
				nextButton={
					<Button style={{background: '#e7e7e7'}} size="small" onClick={this.handleNext}>
						{formLength === activeStep + 1 ? 'Submit' :  'Next'}
                        {formLength > activeStep + 1 && (<KeyboardArrowRight />)}
					</Button>
				}
				backButton= {
					<Button style={{background: '#e7e7e7'}} size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0} >
                        <KeyboardArrowLeft />
						Back
					</Button>
				}
			/>
		)
	}
}