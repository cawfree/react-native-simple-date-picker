# @cawfree/react-native-simple-date-picker
An idiot-proof date picker for React Native, backed by [moment.js](https://github.com/moment/moment).

<p align="center">
  <img src="./bin/out.gif" alt="@cawfree/react-native-simple-date-picker" width="406" height="616">
</p>

## 🚀 Getting Started

Using [`npm`]():
```
npm install --save @cawfree/react-native-simple-picker
```

Using [`yarn`]():
```
yarn add @cawfree/react-native-simple-date-picker
```

## ✍️ Example

```javascript
import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ModalProvider } from '@cawfree/react-native-modal-provider';
import MaterialMenuModal from '@cawfree/react-native-modal-provider/RNModalProvider/src/components/MaterialMenuModal';

import SimpleDatePicker from './components/SimpleDatePicker';

const styles = StyleSheet
  .create(
    {
      container: {
        width: 250,
      },
    },
  );

const App = () => (
  <View
    style={styles.container}
  >
    <ModalProvider
      ModalComponent={MaterialMenuModal}
      position={({ x, y, width, height }) => ({
        position: 'absolute',
        left: x,
        // XXX: Apply some additional padding.
        top: y + height + 5,
      })}
    >
    
      <SimpleDatePicker
      />
    </ModalProvider>
  </View>
);

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
```

## 📋 Prop Types


| Prop Name             | Data Type             | Required  | Default                                                                                                                                           | Description                                                                                                                       |
|---------------------  |---------------------  |---------- |-------------------------------------------------------------------------------------------------------------------------------------------------- |---------------------------------------------------------------------------------------------------------------------------------- |
| `Container`           | propTypes.func        | false     | ({ children, ...extraProps }) => (   <View     {...extraProps}   >     {children}    </View> )                                                    | Defines the React Component instance to use when containing the DatePicker components.                                            |
| `theme`               | propTypes.shape({})   | false     | {   fontSize: 16,   color: '#444444',   disabledColor: '#CCCCCC',   borderRadius: 5,   padding: 1,   borderWidth: 1,   highlightColor: 'blue', }  | Defines some style configuration for the <SimpleDatePicker />.                                                                    |
| `date`                | propTypes.shape       | false     | undefined                                                                                                                                         | A moment object. Can be used to define the current date to render using the SimpleDatePicker, or can be left `null`/`undefined`.  |
| `onDatePicked`        | propTypes.func        | false     | moment => null                                                                                                                                    | Callback for when the user has finished selecting a date, or made an update to an existing date and that date is valid.           |
| `minDate`             | propTypes.shape({})   | false     | Moment().subtract(100, 'years')                                                                                                                   | The minimum allowable selectable date.                                                                                            |
| `maxDate`             | propTypes.shape({})   | false     | Moment()                                                                                                                                          | The maximum allowable selectable date.                                                                                            |
| `renderDescription`   | propTypes.func        | false     | moment => <Text>{moment.format(...)}</Text>                                                                                                       | A function that can be called to render a React component once a valid date has been selected.                                    |

## ✌️ License
[MIT](https://opensource.org/licenses/MIT).
