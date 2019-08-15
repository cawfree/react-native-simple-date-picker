import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Platform,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Moment from 'moment';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';

import SimpleDropdown from './SimpleDropdown';

const pad = (n, z) => (Array(z).join('0') + (n)).slice(-z);

const styles = StyleSheet
  .create(
    {
      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  );

class SimpleDatePicker extends React.Component {
  // TODO: Realistic minima/maxima?
  static getYearData = (minDate = Moment(new Date(0)), maxDate = Moment(new Date(8640000000000000))) => {
    const numberOfYears = maxDate.diff(minDate, 'years', false);
    return [...Array(numberOfYears)]
      .map((e, i) => Moment(minDate).add(numberOfYears - i, 'years').format('YYYY'));
  }
  static extrapolateStateFromMoment = (moment, minDate, maxDate) => {
    const yearData = SimpleDatePicker
      .getYearData(
        minDate,
        maxDate,
      );
    const year = yearData.indexOf(moment.format('YYYY'));
    if (year < 0) {
      throw new Error(
        `A date was supplied which does not fall within the minimum/maximum range!`,
      );
    }
    const monthData = Moment
      .months();
    const month = monthData.indexOf(moment.format('MMMM'));
    const dayData = SimpleDatePicker.getDayData(
      year,
      yearData,
      month,
      monthData,
    );
    const day = dayData.indexOf(Number.parseInt(moment.format('D')));
    // TODO: Should throw if year is not defined.
    return {
      monthOpen: false,
      monthData,
      month,
      dayOpen: false,
      day,
      dayData,
      yearOpen: false,
      yearData,
      year,
    };
  }
  constructor(props) {
    super(props);
    const { date, minDate, maxDate } = props;
    this.state = {
      //width: undefined,
      monthOpen: false,
      monthData: Moment.months(),
      month: -1,
      dayOpen: false,
      dayData: [],
      day: -1,
      yearOpen: false,
      yearData: SimpleDatePicker
        .getYearData(
          minDate,
          maxDate,
        ),
      year: -1,
      ...((!!date) && SimpleDatePicker.extrapolateStateFromMoment(
        date,
        minDate,
        maxDate,
      ) : {}),
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
  componentWillUpdate(nextProps, nextState) {
    const { date } = nextProps;
    const {
      day,
      month,
      year,
    } = nextState;
    const dayIsValid = (day >= 0) && (month >= 0) && (year >= 0);
    const dayWasValid = (this.state.day >= 0) && (this.state.month >= 0) && (this.state.year >= 0);
    // TODO: And date changed.
    if ((!!date) && (date !== this.props.date)) {
      const { minDate, maxDate } = nextProps;
      this.setState(
        {
          ...SimpleDatePicker
            .extrapolateStateFromMoment(
              date,
              minDate,
              maxDate,
            ),
        },
      );
    } else if (!dayIsValid && dayWasValid) {
      const { onDatePicked } = nextProps;
      if (onDatePicked) {
        onDatePicked(undefined);
      }
    }
  }
  onDaySelected = (day) => {
    this.setState(
      {
        day,
        dayOpen: false,
      },
      () => this.attemptUpdateCaller(),
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
      () => this.attemptUpdateCaller(),
    );
  }
  onYearSelected = (year) => {
    const { maxDate, minDate } = this.props;
    const {
      day,
      yearData,
      month,
      monthData,
    } = this.state;
    const monthIsValid = (month >= 0) && Moment(`${yearData[year]}-${pad(month + 1, 2)}`).isBetween(minDate, maxDate);
    const nextMonth = monthIsValid ? month : -1;
    const dayData = SimpleDatePicker
      .getDayData(
        year,
        yearData,
        nextMonth,
        monthData,
      );
    const nextDay = (dayData.indexOf(day + 1) >= 0) ? day : -1;
    this.setState(
      {
        year,
        month: nextMonth,
        dayData,
        day: nextDay,
        yearOpen: false,
        monthOpen: !monthIsValid || (month < 0),
        dayOpen: monthIsValid && (nextDay !== day),
      },
      () => this.attemptUpdateCaller(),
    );
  }
  attemptUpdateCaller = () => {
    const {
      onDatePicked,
    } = this.props;
    if (onDatePicked) {
      const currentMoment = this.getCurrentMoment();
      if (currentMoment) {
        return onDatePicked(
          currentMoment,
        );
      }
    }
    return false;
  };
  getCurrentMoment = () => {
    const {
      day,
      month,
      year,
    } = this.state;
    if (day >= 0 && month >= 0 && year >= 0) {
      const { yearData } = this.state;
      return Moment(
        `${yearData[year]}-${pad(month + 1, 2)}-${pad(day + 1, 2)}`,
        'YYYY-MM-DD',
      );
    }
    return null;
  };
  //onLayout = ({ nativeEvent: { layout: { width, height } } }) => this.setState(
  //  {
  //    width,
  //    height,
  //  },
  //);
  static getDayData = (year, yearData, month, monthData) => {
    const daysInMonth = (year >= 0 && month >= 0) ? (Moment(`${yearData[year]}-${pad(month + 1, 2)}`).daysInMonth()) : 0;
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
      renderDescription,
    } = this.props;
    const {
      date,
      width,
      height,
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
    const {
      disabledColor,
      borderWidth,
      borderRadius,
      padding,
      highlightColor,
    } = theme;
    const dropdownStyle = {
      borderWidth,
      borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding,
    };
    const iconWidth = 25;
    const yearDisabled = false;//(dayOpen || monthOpen);
    const monthDisabled = (year < 0);// || (dayOpen || yearOpen);
    const dayDisabled = (month < 0);// || (monthOpen || yearOpen);
    //const sharedWidth = (width - ((3 * padding) + iconWidth));
          //onLayout={this.onLayout}
    const currentMoment = this.getCurrentMoment();
    return (
      <Container
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View
            style={[
              styles.icon,
              {
                width: iconWidth,
                height: iconWidth,
                overflow: 'hidden',
              },
            ]}
          >
            <FontAwesomeIcon
              color={disabledColor}
              name="calendar"
              size={22}
            />
          </View>
          <View
            pointerEvents={(dayOpen || monthOpen) ? 'none' : 'auto'}
            style={[
              dropdownStyle,
              {
                marginHorizontal: padding,
                flex: 0.3,
                borderColor: yearOpen ? highlightColor : disabledColor,
              },
            ]}
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
            pointerEvents={(dayOpen || yearOpen) ? 'none' : 'auto'}
            style={[
              dropdownStyle,
              {
                marginRight: padding,
                flex: 0.5,
                borderColor: monthOpen ? highlightColor : disabledColor,
              },
            ]}
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
              isOptionDisabled={(option, i) => {
                const moment = Moment(`${yearData[year]}-${pad(i + 1, 2)}`);
                return !moment.isBetween(
                  minDate,
                  maxDate,
                );
              }}
            />
          </View>
          <View
            pointerEvents={(monthOpen || yearOpen) ? 'none' : 'auto'}
            style={[
              dropdownStyle,
              {
                flex: 0.2,
                borderColor: dayOpen ? highlightColor : disabledColor,
              },
            ]}
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
              isOptionDisabled={(option, i) => {
                const moment = Moment(`${yearData[year]}-${pad(month + 1, 2)}-${pad(i + 1, 2)}`);
                return !moment.isBetween(
                  minDate,
                  maxDate,
                );
              }}
            />
          </View> 
        </View>
        {((!!renderDescription) && (!!currentMoment)) && (
          renderDescription(
            currentMoment,
            theme,
          )
        )}
      </Container>
    );
  }
}

// TODO: needs disabled 
SimpleDatePicker.propTypes = {
  Container: PropTypes.func,
  theme: PropTypes.shape({}),
  date: PropTypes.shape({}),
  onDatePicked: PropTypes.func,
  minDate: PropTypes.shape({}),
  maxDate: PropTypes.shape({}),
  renderDescription: PropTypes.func,
};

SimpleDatePicker.defaultProps = {
  Container: ({ children, ...extraProps }) => (
    <View
      {...extraProps}
    >
      {children}
    </View>
  ),
  theme: {
    fontSize: 16,
    color: '#444444',
    disabledColor: '#CCCCCC',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    highlightColor: 'blue',
  },
  date: undefined, //Moment(),
  onDatePicked: (moment) => {
    const msg = `${moment}`;
    if (Platform.OS === 'web') {
      return console.log(msg);
    }
    return Alert
      .alert(
        msg,
      );
  },
  minDate: Moment().subtract(100, 'years'),
  maxDate: Moment(),
  renderDescription: (moment, { padding, disabledColor }) => (
    <Text
      style={{
        color: disabledColor,
        alignSelf: 'flex-end',
        fontSize: 13,
        marginTop: padding,
      }}
    >
      {`${moment.format('dddd LL')}.`}
    </Text>
  ),
};

export default SimpleDatePicker;
