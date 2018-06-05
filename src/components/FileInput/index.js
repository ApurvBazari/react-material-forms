import React from 'react'
import Delete from '@material-ui/icons/Delete';
import FileUpload from '@material-ui/icons/FileUpload';
import Button from '@material-ui/core/Button';
import TextInput from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import {fileInputStyles} from './__style'

class FileInput extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            readerResult: null
        }
    }

    onClick = name => e => {
        const file = e.target.files[0]
        const type = e.target.type
        const fileUrl = e.target.value
        const reader = new FileReader()
        reader.onloadend = () => {
            this.setState({
                file: file,
                readerResult: reader.result
            },
            () => {
                const readerResult = this.state.readerResult.split(/\w,+/g)
                const fileBlob = readerResult[1]
                console.log(fileBlob)
                this.props.onChange(name, fileBlob)
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        const {classes, fieldData} = this.props
        return (
            <div style={{marginTop: '20px', paddingTop: '20px'}}>
            <div style={{display: "flex", position: 'relative'}}>
                <TextInput
                    label={fieldData.label}
                    defaultValue={fieldData.placeholder}
                    helperText={fieldData.helperText}
                    fullWidth
                />
                <input type="file" style={{position: 'absolute', right: '0px', width: '100px', zIndex: '2', top: "15px", "height":"50px", "opacity": "0"}} accept="images/*" onChange={this.onClick(fieldData.name)} />
                <Button type="file" className={classes.button} variant="raised" color="default">
                    Upload
                    <FileUpload className={classes.rightIcon} />
                </Button>
            </div>
            <div style={{marginTop: '10px'}}>
                {this.state.readerResult && (
                    <div className="preview" style={{textAlign: 'center'}}>
                        <img style={{width: '350px'}}src={this.state.readerResult} />
                    </div>
                )}
            </div>
            </div>
        )
    }
}

export default withStyles(fileInputStyles, {withTheme: true})(FileInput)