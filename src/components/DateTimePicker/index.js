import React, { PureComponent } from 'react';
// import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

export default class DateTime extends PureComponent {
constructor(props) {
  super(props)
  this.state = {
    selectedDate: new Date(),
  }
}

handleDateChange = (date) => {
  this.setState({ selectedDate: date });
  this.props.onDateChange(this.props.name, date)
}

  render() {
    const { selectedDate } = this.state;
    const { component } = this.props

      switch(component) {
        case 'Date': return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              value={selectedDate}
              onChange={this.handleDateChange}
          />
          </MuiPickersUtilsProvider>
        )
      case 'Time': return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <TimePicker
            value={selectedDate}
            onChange={this.handleDateChange}
            />
        </MuiPickersUtilsProvider>
      )
    case 'DateTime': return(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
        value={selectedDate}
        onChange={this.handleDateChange}
        />
      </MuiPickersUtilsProvider>
    )}
  }
}