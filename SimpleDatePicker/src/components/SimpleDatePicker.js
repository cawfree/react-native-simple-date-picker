import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';

import SimpleDropdown from './SimpleDropdown';

const styles = StyleSheet
  .create(
    {
      container: {
        flex: 1,
        flexDirection: 'row',
      },
    },
  );

class SimpleDatePicker extends React.Component {
  static getYearData = (moment = Moment(), minDate = Moment(new Date(0)), maxDate = Moment(new Date(8640000000000000))) => {
    const monthData = Moment.months();
    const month = monthData.indexOf(moment.format('MMMM'));
    const numberOfYears = maxDate.diff(minDate, 'years', false);
    return [...Array(numberOfYears)]
      .map((e, i) => Moment(minDate).add(i, 'years').format('YYYY'));
  }
  constructor(props) {
    super(props);
    const { minDate, maxDate } = props;
    this.state = {
      width: undefined,
      monthOpen: false,
      monthData: Moment.months(),
      month: -1,
      dayOpen: false,
      day: -1,
      dayData: [],
      yearOpen: false,
      yearData: SimpleDatePicker
        .getYearData(
          undefined,
          minDate,
          maxDate,
        ),
      year: -1,
    };
  }
  onRequestOpen = type => this.setState(
    {
      monthOpen: false,
      dayOpen: false,
      yearOpen: false,
      [`${type}Open`]: true,
    },
  );
  onDaySelected = (day) => {
    this.setState(
      {
        day,
        dayOpen: false,
      },
    );
  }
  onMonthSelected = (month) => {
    const {
      day,
      year,
      yearData,
      monthData,
    } = this.state;
    const dayData = SimpleDatePicker
      .getDayData(
        year,
        yearData,
        month,
        monthData,
      );
    const nextDay = (dayData.indexOf(day + 1) >= 0) ? day : -1;
    this.setState(
      {
        month,
        monthOpen: false,
        dayData,
        day: nextDay,
        dayOpen: (nextDay !== day) || day < 0,
      },
    );
  }
  onYearSelected = (year) => {
    const {
      day,
      yearData,
      month,
      monthData,
    } = this.state;
    const dayData = SimpleDatePicker
      .getDayData(
        year,
        yearData,
        month,
        monthData,
      );
    const nextDay = (dayData.indexOf(day + 1) >= 0) ? day : -1;
    this.setState(
      {
        year,
        dayData,
        day: nextDay,
        yearOpen: false,
        monthOpen: month < 0,
        dayOpen: nextDay !== day,
      },
    );
  }
  onLayout = ({ nativeEvent: { layout: { width } } }) => this.setState(
    {
      width,
    },
  );
  static getDayData = (year, yearData, month, monthData) => {
    const daysInMonth = (year >= 0 && month >= 0) ? (Moment(`${yearData[year]}-${(Array(2).join('0') + (month + 1)).slice(-2)}`).daysInMonth()) : 0;
    return [...Array(daysInMonth)]
      .map((e, i) => i + 1);
  };
  render() {
    const {
      Container,
      theme,
      minDate,
      maxDate,
      onDatePicked,
      disabled,
    } = this.props;
    const {
      date,
      width,
      monthOpen,
      monthData,
      month,
      dayOpen,
      dayData,
      day,
      yearOpen,
      yearData,
      year,
    } = this.state;
    const yearDisabled = (dayOpen || monthOpen);
    const monthDisabled = (year < 0) || (dayOpen || yearOpen);
    const dayDisabled = (month < 0) || (monthOpen || yearOpen);
    return (
      <Container
        onLayout={this.onLayout}
      >
        {(!!width) && (
          <React.Fragment
          >
            <View
              style={{
                width: width * 0.33,
              }}
            >
              <SimpleDropdown
                theme={theme}
                placeholder="Year"
                disabled={disabled || yearDisabled}
                index={year}
                options={yearData}
                open={yearOpen}
                onOptionSelected={this.onYearSelected}
                onRequestOpen={() => this.setState({ yearOpen: true })}
              />
            </View>
            <View
              style={{
                width: width * 0.33,
              }}
            >
              <SimpleDropdown
                theme={theme}
                placeholder="Month"
                disabled={disabled || monthDisabled}
                index={month}
                options={monthData}
                open={monthOpen}
                onOptionSelected={this.onMonthSelected}
                onRequestOpen={() => this.setState({ monthOpen: true })}
              />
            </View>
            <View
              style={{
                width: width * 0.33,
              }}
            >
              <SimpleDropdown
                theme={theme}
                placeholder="Day"
                disabled={disabled || dayDisabled}
                index={day}
                options={dayData}
                open={dayOpen}
                onOptionSelected={this.onDaySelected}
                onRequestOpen={() => this.setState({ dayOpen: true })}
              />
            </View>
          </React.Fragment>
        )} 
      </Container>
    );
  }
}

SimpleDatePicker.propTypes = {
  Container: PropTypes.func,
  theme: PropTypes.shape({}),
  date: PropTypes.shape({}),
  onDatePicked: PropTypes.func,
  minDate: PropTypes.shape({}),
  maxDate: PropTypes.shape({}),
};

SimpleDatePicker.defaultProps = {
  Container: ({ children, ...extraProps}) => (
    <View
      style={styles.container}
      {...extraProps}
    >
      {children}
    </View>
  ),
  theme: {
    
  },
  date: undefined,
  onDatePicked: moment => null,
  minDate: Moment().subtract(3, 'years'),
  maxDate: Moment().add(3, 'years'),
};

export default SimpleDatePicker;
