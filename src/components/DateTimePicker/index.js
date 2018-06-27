import React, { PureComponent } from 'react';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

import leftIcon from '../../icons/arrow_left.svg'

import { Icon } from '@material-ui/core'

export default class DateTime extends PureComponent {
constructor(props) {
  super(props)
  this.state = {
    selectedDate: props.initialValue || null,
  }
}

handleDateChange = (date) => {
  this.setState({ selectedDate: date });
  this.props.onDateChange(this.props.name, date)
}

  render() {
    const { selectedDate } = this.state;
    const { fieldData, data } = this.props

      switch(fieldData.type) {
        case 'Date': return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              value={selectedDate}
              onChange={this.handleDateChange}
              label={fieldData.label}
          />
          </MuiPickersUtilsProvider>
        )
      case 'Time': return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <TimePicker
            value={selectedDate}
            onChange={this.handleDateChange}
            label={fieldData.label}
            />
        </MuiPickersUtilsProvider>
      )
    case 'DateTime': return(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
        placeholder={fieldData.placeholder}
        clearable={fieldData.clearable}
        value={selectedDate}
        onChange={this.handleDateChange}
        label={fieldData.label}
        invalidLabel={fieldData.errorText}
        disableFuture={fieldData.disableFuture}
        disablePast={fieldData.disablePast}
        keyboard={fieldData.keyboard}
        //keyboardIcon={keyboardIcon}
       // dateRangeIcon
       leftArrowIcon={ <Icon> add_alarm </Icon>}
       rightArrowIcon="keyboard_arrow_right"
       timeIcon="access_time"
        maxDate={fieldData.maxDate}
        minDate={fieldData.minDate}
        maxDateMessage={fieldData.maxDateMessage}
        minDateMessage={fieldData.minDateMessage}
        showTodayButton={fieldData.showTodayButton}
        />
      </MuiPickersUtilsProvider>
    )
  default: return null
  }
  }
}