import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import MaterialMenu, { MenuItem } from 'react-native-material-menu';

class SimpleDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    const {
      open,
    } = this.props;
    if (open) {
      const { menu } = this.refs;
      menu
        .show();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    const {
      open,
    } = nextProps;
    if (open !== this.props.open) {
      const { menu } = this.refs;
      if (open) {
        menu
          .show();
      } else {
        menu
          .hide();
      }
    }
  }
  render() {
    const {
      open,
      disabled,
      children,
      options,
      onRequestOpen,
      onOptionSelected,
      index,
      placeholder,
      ...extraProps
    } = this.props;
    const {

    } = this.state;
    return (
      <MaterialMenu
        ref="menu"
        button={
          <Text
            onPress={onRequestOpen}
            disabled={disabled}
          >
            {index >= 0 ? options[index] : placeholder}
          </Text>
        }
        {...extraProps}
      >
        <ScrollView
        >
          {options.map(
            (option, i) => (
              <MenuItem
                onPress={() => onOptionSelected(
                  i,
                  option,
                )}
              >
                {option}
              </MenuItem>
            ),
          )}
        </ScrollView>
      </MaterialMenu>
    );
  }
}

SimpleDropdown.propTypes = {
  style: PropTypes.shape({}),
  index: PropTypes.number,
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
  onOptionSelected: PropTypes.func,
  onRequestOpen: PropTypes.func,
  placeholder: PropTypes.string,
};

SimpleDropdown.defaultProps = {
  style: {
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  index: -1,
  open: false,
  disabled: false,
  options: [],
  onOptionSelected: (index, option) => null,
  onRequestOpen: () => null,
  placeholder: 'Please select...',
};

export default SimpleDropdown;
