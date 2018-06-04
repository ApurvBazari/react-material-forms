import React from 'react'
import Delete from '@material-ui/icons/Delete';
import FileUpload from '@material-ui/icons/FileUpload';
import Button from '@material-ui/core/Button';
import TextInput from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import {fileInputStyles} from './__style'

class FileInput extends React.PureComponent {
    onClick = name => e => {
        console.log(name, e)
    }

    render() {
        const {classes, fieldData} = this.props
        return (
            <div style={{display: "flex", position: 'relative'}}>
                <TextInput
                    label={fieldData.label}
                    defaultValue={fieldData.placeholder}
                    helperText={fieldData.helperText}
                    fullWidth
                />
                <input type="file" style={{position: 'absolute', right: '0px', width: '100px', zIndex: '2', top: "15px", "height":"50px", "opacity": "0"}} accept="images/*" onClick={this.onClick(fieldData.name)} />
                <Button type="file" className={classes.button} variant="raised" color="default">
                    Upload
                    <FileUpload className={classes.rightIcon} />
                </Button>
            </div>
        )
    }
}

export default withStyles(fileInputStyles, {withTheme: true})(FileInput)