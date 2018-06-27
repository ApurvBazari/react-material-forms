import React, { PureComponent } from 'react';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

import { ChevronLeft, ChevronRight, AccessTime, DateRange } from '@material-ui/icons/'

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
      dateRangeIcon={<DateRange/>}
       leftArrowIcon={ <ChevronLeft/>}
       rightArrowIcon={ <ChevronRight /> }
       timeIcon={<AccessTime/>}
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