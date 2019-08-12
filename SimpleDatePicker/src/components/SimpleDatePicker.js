import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';

import SimpleDropdown from './SimpleDropdown';

class SimpleDatePicker extends React.Component {
  state = {
    monthOpen: false,
    dayOpen: false,
    yearOpen: false,
    month: -1,
    day: -1,
    year: -1,
  }
  onRequestOpen = type => this.setState(
    {
      [`${type}Open`]: true,
    },
  );
  onOptionSelected = (type, index) => this.setState(
    {
      [type]: index,
      [`${type}Open`]: false,
    },
  );
  render() {
    const {
      monthOpen,
      month,
    } = this.state;
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: 'green',
          },
        ]}
      >
        <SimpleDropdown
          index={month}
          options={Moment.months()}
          open={monthOpen}
          onOptionSelected={index => this.onOptionSelected('month', index)}
          onRequestOpen={() => this.setState({ monthOpen: true })}
        />
      </View>
    );
  }
}

SimpleDatePicker.propTypes = {
  
};

SimpleDatePicker.defaultProps = {
  
};

export default SimpleDatePicker;
