import React from 'react';
import {
  Dimensions,
  Text,
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { withModal } from '@cawfree/react-native-modal-provider';
import { MenuItem } from 'react-native-material-menu';

const ConnectedMaterialMenuModal =  withModal(
  ({ children, ...extraProps }) => {
    return (
      <React.Fragment
      >
        {children}
      </React.Fragment>
    );
  },
  ({ layout, visible, button: ButtonComponent }) => {
    return (
      <ButtonComponent
      />
    );
  },
);

class SimpleDropdown extends React.Component {
  render() {
    const {
      theme,
      open,
      disabled,
      children,
      options,
      onRequestOpen,
      onOptionSelected,
      index,
      placeholder,
      style,
      isOptionDisabled,
      ...extraProps
    } = this.props;
    const {
      color,
      disabledColor,
      fontSize,
    } = theme;
    return (
      <View
        pointerEvents={disabled ? 'none' : 'auto'}
      >
        <ConnectedMaterialMenuModal
          visible={open}
          style={style}
          ref="menu"
          disabled={disabled}
          button={
            ({ ...extraProps }) => (
              <Text
                style={{
                  flex: 1,
                  color: disabled ? disabledColor : color,
                  fontSize,
                }}
                onPress={onRequestOpen}
                disabled={disabled}
              >
                {index >= 0 ? options[index] : placeholder}
              </Text>
            )
          }
          {...extraProps}
        >
          <ScrollView
            style={style}
          >
            {options.map(
              (option, i) => (
                <MenuItem
                  onPress={() => onOptionSelected(
                    i,
                    option,
                  )}
                  disabled={isOptionDisabled(option, i)}
                >
                  {option}
                </MenuItem>
              ),
            )}
          </ScrollView>
        </ConnectedMaterialMenuModal>
      </View>
    );
  }
}

SimpleDropdown.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}),
  index: PropTypes.number,
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
  onOptionSelected: PropTypes.func,
  onRequestOpen: PropTypes.func,
  placeholder: PropTypes.string,
  isOptionDisabled: PropTypes.func,
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
  isOptionDisabled: (option, i) => false,
};

export default SimpleDropdown;
