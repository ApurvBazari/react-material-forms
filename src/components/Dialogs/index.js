import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@material-ui/core'

function Transition(props) {
    return <Slide direction="up" {...props} />
}

export default class FormDialog extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: this.props.isOpen
        }
    }

    componentWillReceiveProps = (nextProps, prevProps) => {
        if(nextProps !== prevProps) {
            this.setState({
                open: nextProps.isOpen
            })
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
        this.props.handleDialogClose()
    }

    render() {
        const { contentText, contentTitle, buttonText } = this.props
        return (
            <Dialog
                open={this.state.open}
                TransitionComponent= {Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {contentTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        {buttonText}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}